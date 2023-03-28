$(document).ready(function () {
  getMySpec();
});

// 해당 계정 내정보 불러오기
function getMySpec() {
  $.ajax({
    type: 'GET',
    url: `/user/`,
    data: {},
    success: function (response) {
      let id = response.userId;
      let name = response.name;
      let email = response.email;
      let type = response.userType;
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
          홈으로
        </button>
        <button class="joinBtn" type="button" onclick="update_info()">정보수정</button>
      </div>
      <div class="deleteBox">
        <button class="deleteBtn"onclick="delete_user()">회원탈퇴하기</button>
      </div>`;
      $('.zone_login').append(temp_html);
    },
  });
}

// 해당 계정 정보 수정
function update_info() {
  let password = $('#password').val();
  let pwCheck = $('#pwCheck').val();
  let name = $('#name').val();
  let email = $('#email').val();

  if (password !== pwCheck) {
    return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
  }

  $.ajax({
    type: 'PUT',
    url: '/user/update',
    data: {
      password,
      name,
      email,
    },
    success: function (response) {
      alert('회원정보 수정이 완료되었습니다!');
      window.location.href = '/render-user/home';
    },
    error: function (response) {
      alert('회원정보 수정에 실패하였습니다!');
    },
  });
}

// 해당 계정 회원탈퇴
function delete_user() {
  $.ajax({
    type: 'DELETE',
    url: '/user/delete',
    data: {},
    success: function (response) {
      alert('회원탈퇴가 정상적으로 완료되었습니다!');
      window.location.href = '/render-user/home';
    },
    error: function (response) {
      alert('회원탈퇴에 실패하였습니다!');
    },
  });
}
