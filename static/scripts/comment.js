function comment() {
  let userId = $('#userId').val();
  let reviewId = $('#reviewId').val();
  // let passwordCheck = $('#passwordCheck').val();
  let review = $('#review').val();
  let user = $('#user').val();
  let comment = $('#comment').val();

  $.ajax({
    type: 'POST',
    url: '/comments',
    data: {
      userId,
      reviewId,
      review,
      comment,
      user,
    },
    success: function (response) {
      customAlert(response.message);
      window.location.replace('/comment');
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
