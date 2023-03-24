$(document).ready(function () {
  get_buttonURL();
  get_reviews(performId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');

function get_buttonURL() {
  let temp_html = `<button
  class="reviewWriteBtn"
  onclick="location.href='/render-review/${performId}/create'"
  >
  리뷰 작성하기</button>`;
  $('.reviewWriteBtnBox').append(temp_html);
}

function get_reviews(performId) {
  $.ajax({
    type: 'GET',
    url: `/review/${performId}/reviews`,
    data: { performId },
    success: function (response) {
      console.log('성공!!', response);
      for (const e of response.reviews) {
        // let star = e.rating;
        let date = e.createdAt;
        let review = e.review;
        let temp_html = `<div class="reviewBox">
      <div class="starDateBox">
        <span class="starBox"
          ><img src="img/starGold.png" style="height: 20px" />&nbsp;<img
            src="img/starGold.png"
            style="height: 20px" />&nbsp;<img
            src="img/starGold.png"
            style="height: 20px" />&nbsp;<img
            src="img/starGold.png"
            style="height: 20px" />&nbsp;<img
            src="img/starGold.png"
            style="height: 20px"
        /></span>
        <span class="dateBox">${date}</span>
      </div>
      <div class="reviewContent">
      ${review}
      </div>
      <div class="iconBox">
        <button class="likeBtn">
          <img src="img/heartPinkEmpty.png" style="height: 20px" />&nbsp;30
          Likes</button
        >&nbsp;&nbsp;
        <button class="commentBtn">
          <img src="img/comment.png" style="height: 20px" />&nbsp;45
          Comments
        </button>
      </div>
    </div>`;
        $('.reviewsContainer').append(temp_html);
      }
    },
    error: function (response) {
      console.log('응, 아니야.', response);
      alert('리뷰 작성 실패!');
    },
  });
}

function create_review() {
  let starIndex = $('#starIndex').val();
  let reviewContent = $('#reviewContent').val();
  let userId = 1;
  const searchParams = new URLSearchParams(location.search);
  const performId = searchParams.get('id');
  console.log(searchParams);

  console.log(performId);

  $.ajax({
    type: 'POST',
    url: '/review',
    data: {
      starIndex,
      reviewContent,
      userId,
      performId,
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
