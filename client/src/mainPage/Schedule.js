import "../index.css"; //무조건 상대경로로 지정 (그렇지 않으면 도커에서 빌드시 오류 발생)
import { Batsal } from "../components/Export";

function Schedule() {
  return (
    <main class="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Batsal></Batsal>
      {/* <List></List> */}
    </main>
  );
}
export default Schedule;
