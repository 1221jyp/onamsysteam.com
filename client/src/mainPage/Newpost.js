import "../index.css"; //무조건 상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)
import React, { useState, useEffect } from "react";
import axios from "axios";

function Newpost() {
  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    referenceLink: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인 API 호출
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/check-login");
        console.log("로그인 상태 응답:", response.data); // 응답 로그 추가
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
      }
    };

    checkLoginStatus();
  }, []);

  //Newpost.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인하지 않은 경우 알림 표시
    if (!isLoggedIn) {
      alert("로그인 후에 게시물을 작성할 수 있습니다.");
      return;
    }

    const { subject, title, description, startDate, endDate } = formData;
    if (
      subject.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      startDate.trim() === "" ||
      endDate.trim() === ""
    ) {
      alert("참고링크를 제외한 모든 정보를 작성하세요.");
      return;
    }

    console.log("폼 제출 데이터:", formData); // 폼 데이터 확인용 로그 추가
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다");
      }

      const result = await response.json();
      console.log("폼 제출 성공:", result);
      // 폼 제출 후 필요한 추가 작업 수행
    } catch (error) {
      console.error("폼 제출 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-white shadow-md rounded ">
      <h2 className="text-2xl font-bold mb-4">새 글 작성</h2>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="subject">
          과목
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">과목을 선택하세요</option>
          <option value="독서">독서</option>
          <option value="영어2">영어2</option>
          <option value="수학2">수학2</option>
          <option value="물리학1">물리학1</option>
          <option value="화학1">화학1</option>
          <option value="지구과학1">지구과학1</option>
          <option value="생명과학1">생명과학1</option>
          <option value="생활과윤리">생활과 윤리</option>
          <option value="세계지리">세계지리</option>
          <option value="정치와법">정치와 법</option>
          <option value="경제">경제</option>
          <option value="동아시아사">동아시아사</option>
          <option value="음악">음악</option>
          <option value="미술">미술</option>
          <option value="운동과건강">운동과 건강</option>
          <option value="중국어">중국어</option>
          <option value="일본어">일본어</option>
          <option value="기하">기하</option>
          <option value="고전읽기">고전 읽기</option>
          <option value="영어권문화">영어권 문화</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="title">
          제목
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="description">
          설명
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="startDate">
          시작일
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="endDate">
          만기일
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="referenceLink">
          참고 링크
        </label>
        <input
          name="referenceLink"
          value={formData.referenceLink}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        작성
      </button>
    </form>
  );
}

export default Newpost;
