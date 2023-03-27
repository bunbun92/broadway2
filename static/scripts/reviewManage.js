$(document).ready(function () {
  get_myReviews();
});

// 내가 쓴 모든 리뷰 조회
function get_myReviews() {
  $.ajax({
    type: 'GET',
    url: `/review/user/reviews`,
    data: {},
    success: function (response) {
      for (const e of response.myReviews) {
        let reviewId = e.id;
        let date = new Date(e.createdAt).toLocaleString().slice(0, -3);
        let content = e.review;
        let stars =
          `<img src="img/starGold.png" style="height: 20px" />&nbsp;`.repeat(
            e.rating
          );

        let temp_html = `
        <div class="reviewBox">
        <div class="starDateBox">
          <span class="starBox"
            >${stars}</span>
          <span class="dateBox">${date}</span>
        </div>
        <div class="reviewContent">
        ${content}
        </div>
        <div class="iconBox">
          <button class="likeBtn" onclick="location.href='/render-review/update?id=${reviewId}'">
            <img src="img/edit.png" style="height: 20px" />&nbsp;수정</button>&nbsp;
          <button class="commentBtn"
            onclick="delete_review(${reviewId})">
            <img src="img/trash.png" style="height: 20px" />&nbsp;삭제
          </button>
        </div>
      </div>`;
        $('.reviewsContainer').append(temp_html);
      }
    },
    error: function (response) {
      alert('리뷰 작성 실패!');
    },
  });
}

// 해당 리뷰 삭제
function delete_review(reviewId) {
  $.ajax({
    type: 'DELETE',
    url: `/review/delete/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      alert('게시물 삭제가 정상적으로 완료되었습니다!');
      window.location.reload();
    },
    error: function (response) {
      alert('게시물 삭제에 실패하였습니다!');
    },
  });
}

function display_flex() {
  $('#displayNoneShow').show();
}

function display_none() {
  $('#displayNoneShow').hide();
}
