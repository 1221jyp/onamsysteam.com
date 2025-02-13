function Home() {
  return (
    <div>
      <header
        className="py-5 bg-image-full position-relative"
        style={{
          backgroundImage: "url('/images/home2.jpg')", // public/images/home1.jpg 파일을 배경으로 사용
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 검정 배경 추가
            top: 0,
            left: 0,
          }}
        ></div>
        <div className="text-center my-5 position-relative" style={{ zIndex: 1 }}>
          <img
            className="img-fluid rounded-circle mb-4"
            src="/images/home1.jpg"
            alt="..."
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <h1 className="text-white fs-3 fw-bolder">시스팀</h1>
          <p className="text-white mb-0">오남고등학교 컴퓨터공학 동아리</p>
        </div>
      </header>
      <section class="py-3">
        <div class="container my-5">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2 class="mb-3">하는 활동</h2>
              <p class="lead">
                시스팀에선 동아리 이름에 맞게 동아리원끼리 팀을 구성하여 각 팀별로 실물 프로그램을
                만들어내는 활동을 합니다.
              </p>
              <p class="mb-0">
                실물 프로그램은 웹사이트, 게임, GUI응용 프로그램 등이 될 수 있으며, 어떤 프로그램을
                만들지 결정을 못한 학생을 위해 python프로그래밍 언어의 tkinter라이브러리를 활용하여
                컴퓨터에서 작동 가능한 GUI 응용 프로그램을 만드는법에 대한 강의를 준비할 예정입니다.
                <br></br>
                <br></br>
                ** 꼭 팀으로 활동할 필요는 없습니다!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-0">
        <div class="container my-5">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2>가입 요구 사항</h2>
              <p class="lead"> * 파이썬 or 기타 프로그래밍 언어 기초</p>
              <p class="mb-0">
                프로그래밍 언어로 조건문, 함수문 정도는 다루실줄 아셔야 GUI 응용 프로그램 제작
                수업을 따라오기 수월할 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
