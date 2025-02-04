import React, { useEffect, useState } from "react";

const Batsal = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/pa")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div class="grid gap-6">
      <div>
        <h2 class="font-semibold text-lg md:text-xl">다가오는 평가</h2>
        <div class="grid gap-4 mt-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <p className="text-sm text-muted-foreground">{item.subject}</p>
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  {item.title}
                </h3>
              </div>
              <div className="p-6">
                <p>{item.description}</p>
                <p>시작일: {new Date(item.start_date).toLocaleDateString()}</p>
                <p>마감일: {new Date(item.end_date).toLocaleDateString()}</p>
                <p>
                  참고 링크:{" "}
                  <a href={item.reference_link} target="_blank" rel="noopener noreferrer">
                    {item.reference_link}
                  </a>
                </p>
                <p>작성일: {new Date(item.created_at).toLocaleDateString()}</p>
                <p>작성자: {item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Batsal;
