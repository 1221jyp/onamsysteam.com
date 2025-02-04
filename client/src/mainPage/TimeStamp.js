import React from "react";
import "../index.css"; //무조건 상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)

const schedules = [
  { name: "스케줄 1", start: "2024-01-01", end: "2024-01-03" },
  { name: "스케줄 2", start: "2024-01-02", end: "2024-01-03" },
  // 추가 스케줄
];

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const Scheduler = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        {" "}
        {/* 가로 스크롤 추가 */}
        <div className="grid grid-cols-4 gap-1 bg-gray-300">
          <div className="cell bg-gray-400 text-center p-2">종류</div>
          <div className="cell bg-gray-200 text-center p-2">2024-01-01</div>
          <div className="cell bg-gray-200 text-center p-2">2024-01-02</div>
          <div className="cell bg-gray-200 text-center p-2">2024-01-03</div>
          {/* 추가 날짜 */}
        </div>
        {schedules.map((schedule) => {
          const dateRange = getDatesInRange(schedule.start, schedule.end);
          return (
            <div key={schedule.name} className="grid grid-cols-4 gap-1">
              <div className="cell bg-gray-400 text-center p-2">{schedule.name}</div>
              {["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"].map((date) => (
                <div
                  key={date}
                  className={`cell text-center p-2 ${
                    dateRange.includes(date) ? "bg-green-500" : "bg-white"
                  }`}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Scheduler />
    </div>
  );
};

export default App;
