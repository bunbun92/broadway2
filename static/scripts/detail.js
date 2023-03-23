// $(document).ready(function () {
//   ();
// });

function create_review() {
  let starIndex = $('#starIndex').val();
  let reviewContent = $('#reviewContent').val();
  let userId = 1;

  $.ajax({
    type: 'POST',
    url: '/review',
    data: {
      starIndex,
      reviewContent,
      userId,
    },
    success: function (response) {
      alert('리뷰 작성이 완료되었습니다!');
      window.location.replace('/render-user/login');
    },
    error: function (response) {
      console.log('응, 아니야.', response);
      alert('리뷰 작성 실패!');
    },
  });
}
