function login() {
  let userId = $('#id').val();
  let password = $('#password').val();

  if (!userId || !password) {
    return alert('빈칸을 채워주세요.');
  }

  $.ajax({
    type: 'POST',
    url: '/user/login',
    data: {
      userId,
      password,
    },
    success: function (response) {
      customAlert(response.message);
      window.location.replace('/');

      // if (response.data === 2) {
      //   window.location.replace('/admin-users');
      // } else {
      //   window.location.replace('/mypage');
      // }
    },
    error: function (response) {
      customAlert(response.responseJSON.errorMessage);
    },
  });
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}
