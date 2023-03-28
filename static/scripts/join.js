function join() {
  let userId = $('#userId').val();
  let password = $('#password').val();
  let pwCheck = $('#pwCheck').val();
  let name = $('#name').val();
  let email = $('#email').val();
  let userType = $('#userType').val();

  if (password !== pwCheck) {
    return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
  }

  $.ajax({
    type: 'POST',
    url: '/user/signup',
    data: {
      userId,
      password,
      name,
      email,
      userType,
    },
    success: function (response) {
      alert('회원가입이 완료되었습니다!');
      window.location.replace('/render-user/login');
    },
    error: function (response) {
      console.log('응, 아니야.', response);
      console.log('응, 아니야.');
      customAlert(response.responseJSON.errorMessage);
    },
  });
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}
