import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      axios
        .post("/api/logout") // 로그아웃 API 호출
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((error) => {
          console.error("로그아웃 오류:", error);
        });
    } else {
      // 로그인 처리 (구글 로그인으로 리다이렉트)
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#!">
          시스팀
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                href="/"
              >
                홈
              </a>
            </li>
            <li class="nav-item">
              <a
                className={`nav-link ${location.pathname === "/enroll" ? "active" : ""}`}
                href="/enroll"
              >
                동아리 신청하기
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={handleLoginLogout}>
                {isLoggedIn ? "로그아웃" : "로그인"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
