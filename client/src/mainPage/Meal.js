import "../index.css"; //무조건 상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)
import React, { useEffect, useState } from "react";

function Meal() {
  const [mealInfo, setMealInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "ab880ce116ad45959558480f9b1a0531"; // 발급받은 API 키
  const schoolCode = 7530893; // 학교 코드
  const atptCode = "J10"; // 교육청 코드

  const getDayOfWeek = (dateString) => {
    const date = new Date(
      dateString.slice(0, 4),
      dateString.slice(4, 6) - 1,
      dateString.slice(6, 8)
    );
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };

  const getFormattedDate = (date) => {
    return date.toISOString().slice(0, 10).replace(/-/g, "");
  };

  const fetchMealData = async (date) => {
    const url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
    const params = {
      KEY: apiKey,
      Type: "json",
      ATPT_OFCDC_SC_CODE: atptCode,
      SD_SCHUL_CODE: schoolCode,
      MLSV_YMD: date,
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }
    const mealData = await response.json();
    return mealData.mealServiceDietInfo[1].row[0];
  };

  useEffect(() => {
    const fetchMealInfo = async () => {
      try {
        const today = new Date();
        const meals = [];

        // 오늘의 요일 확인
        const dayOfWeek = today.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // 일요일(0) 또는 토요일(6)
          const nextMonday = new Date(today);
          nextMonday.setDate(today.getDate() + (8 - dayOfWeek)); // 다음 주 월요일
          const nextTuesday = new Date(nextMonday);
          nextTuesday.setDate(nextMonday.getDate() + 1); // 다음 주 화요일

          meals.push({
            type: "nextMonday",
            data: await fetchMealData(getFormattedDate(nextMonday)),
          });
          meals.push({
            type: "nextTuesday",
            data: await fetchMealData(getFormattedDate(nextTuesday)),
          });
        } else if (dayOfWeek === 5) {
          // 금요일(5)
          meals.push({ type: "today", data: await fetchMealData(getFormattedDate(today)) });

          const nextMonday = new Date(today);
          nextMonday.setDate(today.getDate() + 3); // 다음 주 월요일
          meals.push({
            type: "nextMonday",
            data: await fetchMealData(getFormattedDate(nextMonday)),
          });
        } else {
          // 평일
          meals.push({ type: "today", data: await fetchMealData(getFormattedDate(today)) });

          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1); // 내일
          meals.push({ type: "tomorrow", data: await fetchMealData(getFormattedDate(tomorrow)) });
        }

        setMealInfo(meals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealInfo();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">오늘의 급식</h1>
      {mealInfo.length > 0 && (
        <div className="mb-4 p-4 border rounded-lg shadow-sm">
          <p className="mb-2">
            날짜: {mealInfo[0].data.MLSV_YMD} ({getDayOfWeek(mealInfo[0].data.MLSV_YMD)})
          </p>
          <p>
            급식 내용:{" "}
            {mealInfo[0].data.DDISH_NM.replace(/<br\s*\/?>/gi, "\n")
              .split("\n")
              .map((item, idx) => (
                <span key={idx}>
                  {item.trim()}
                  {idx < mealInfo[0].data.DDISH_NM.split("<br/>").length - 1 && <br />}
                </span>
              ))}
          </p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">다음 급식</h1>
      {mealInfo.length > 1 && (
        <div className="mb-4 p-4 border rounded-lg shadow-sm">
          <p className="mb-2">
            날짜: {mealInfo[1].data.MLSV_YMD} ({getDayOfWeek(mealInfo[1].data.MLSV_YMD)})
          </p>
          <p>
            급식 내용:{" "}
            {mealInfo[1].data.DDISH_NM.replace(/<br\s*\/?>/gi, "\n")
              .split("\n")
              .map((item, idx) => (
                <span key={idx}>
                  {item.trim()}
                  {idx < mealInfo[1].data.DDISH_NM.split("<br/>").length - 1 && <br />}
                </span>
              ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default Meal;
