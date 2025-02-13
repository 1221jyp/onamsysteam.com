import React, { useState, useEffect } from "react";
import axios from "axios";

function Enroll() {
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
      const response = await fetch("/api/enroll", {
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
    } catch (error) {
      console.error("폼 제출 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 bg-white shadow-sm rounded">
      <h2 className="h2 mb-4">동아리 신청</h2>

      <p>동아리 신청 페이지입니다.</p>
      <p>신청 후에 신청서를 고쳐서 다시 제출하고 싶으시면 새로 다시 써서 제출하시면 됩니다.</p>
      <p>신청 후에 신청 취소를 원하신다면,자개소개란에 '취소합니다'를 입력하고 다시 제출해주세요</p>

      <h3 className="h4 mb-4">- 개인정보</h3>

      <div className="mb-3">
        <label className="form-label" htmlFor="idNumber">
          학번
        </label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="다섯자리 입력 ex)10101"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          이름
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="이름 입력 ex)김오남"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="phone">
          연락처
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
          placeholder="공백없이 입력 ex)01012341234"
        />
      </div>

      <h3 className="h4 mb-4">- 질문사항</h3>

      <div className="mb-3">
        <label className="h5 form-label" htmlFor="programmingExp">
          파이썬 혹은 기타 프로그래밍 언어를 사용해본적이 있으십니까?
        </label>
        <div>
          <input
            type="radio"
            id="yes"
            name="programmingExp"
            value="1"
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="yes" className="form-check-label">
            예
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            name="programmingExp"
            value="0"
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="no" className="form-check-label">
            아니요
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="bio">
          자기소개
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="form-control"
          rows="4"
          placeholder="자기소개를 입력하세요"
        />
      </div>

      <button type="submit" className="btn btn-dark w-100 py-2">
        신청하기
      </button>
    </form>
  );
}

export default Enroll;
