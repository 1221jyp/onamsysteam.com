import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS를 불러옴//상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)
import { Footer, Navbar } from "./components/Export";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./mainPage/Home";
import Enroll from "./mainPage/Enroll";
import NotFound from "./setup/NotFound";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {" "}
        {/* flex column으로 설정 */}
        <Navbar />
        <div className="flex-grow-1">
          {" "}
          {/* 콘텐츠가 부족하면 공간을 채워주는 역할 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
