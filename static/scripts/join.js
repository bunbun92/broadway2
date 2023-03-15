function join() {
  let userId = $('#userId').val();
  let password = $('#password').val();
  // let passwordCheck = $('#passwordCheck').val();
  let name = $('#name').val();
  let email = $('#email').val();
  let userType = Number($('#userType').val());
  // if (password !== passwordCheck) {
  //   return customAlert('패스워드를 다시 체크해주세요');
  // }

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
      customAlert(response.message);
      window.location.replace('/login');
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
