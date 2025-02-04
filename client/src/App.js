import "./index.css"; //무조건 상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)
import { Sidebar, Header } from "./components/Export";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./mainPage/Schedule";
import Newpost from "./mainPage/Newpost";
import Meal from "./mainPage/Meal";

function App() {
  return (
    <Router>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Schedule />} />
            {/* <Route path="/timestamp" element={<Timestamp />} /> */}
            <Route path="/newpost" element={<Newpost />} />
            <Route path="/meal" element={<Meal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
