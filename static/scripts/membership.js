$(document).ready(function () {
  getMySpec();
});

// const params = res.local.user;
// const userId = Number(params);
// console.log(params);

function getMySpec() {
  $.ajax({
    type: 'GET',
    url: `/user`,
    data: {},
    success: function (response) {
      for (let e of response) {
        let id = e.userId;
        let pw = e.password;
        let name = e.name;
        let email = e.email;
        let type = e.userType;
        let temp_html = `<div class="wrap">
        <div style="color: #ffcd4a">
          <h1 style="font-weight: bolder">회원정보</h1>
        </div>
      <div class="joinInputs">
        <label for="userId">아이디</label>
        <div class="InfoBox">${id}</div>
        <label for="password">비밀번호</label>
        <input
          type="text"
          class="inputId"
          id="password"
          placeholder="비밀번호는 영어 대소문자와 숫자를 사용한 3글자 이상만 가능합니다."
        />
        <label for="pwCheck">비밀번호 확인</label>
        <input
          type="text"
          class="inputId"
          id="pwCheck"
          placeholder="같은 비밀번호를 한번 더 입력해주세요."
        />
        <label for="name">이름</label>
        <input
          type="text"
          class="inputId"
          id="name"
          placeholder="${name}"
        />
        <label for="email">이메일</label>
        <input
          type="text"
          class="inputId"
          id="email"
          placeholder="${email}"
        />
        <label for="userType">userType</label>
        <div class="InfoBox">${type}</div>

      </div>
      <div class="joinBtns">
        <button
          class="tologinBtn"
          type="button"
          onclick="location.href='/render-user/home'"
        >
          취소
        </button>
        <button class="joinBtn" type="button" onclick="join()">정보수정</button>
      </div>`;
        $('zoneUpdate').append(temp_html);
      }
    },
  });
}
