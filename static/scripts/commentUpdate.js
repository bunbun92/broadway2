$(document).ready(function () {
  get_comment(commentId);
  get_backBtnURL(performId, reviewId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');
const reviewId = Number(searchParams.get('reviewId'));
const commentId = Number(searchParams.get('commentId'));

// 해당 댓글 불러오기
function get_comment(commentId) {
  $.ajax({
    type: 'GET',
    url: `/comments/${commentId}`,
    data: { commentId },
    success: function (response) {
      console.log(performId);
      console.log(reviewId);

      console.log(commentId);
      let comment = response.comment;
      let date = new Date(response.createdAt).toLocaleString().slice(0, -3);

      let temp_html = `
      <div class="commentUpdateBox">
        <div class="UpdateDateBox"> 
          <span class="dateBox">${date}</span>
        </div>
        <div class="reviewContent">
        ${comment}
        </div>
      </div>`;
      $('.commentsUpdateContainer').append(temp_html);
    },
    error: function (response) {
      alert('리뷰 수정 실패!');
    },
  });
}

// 해당 댓글 수정
function update_comment(commentId) {
  let comment = $('#commentContent').val();

  if (!comment) {
    return alert('댓글 내용을 입력해주세요.');
  }

  $.ajax({
    type: 'PUT',
    url: `/comments/update/${commentId}`,
    data: {
      commentId,
      comment,
    },
    success: function (response) {
      alert('댓글 수정이 완료되었습니다!');
      window.location.href = `/render-review/comment?id=${performId}&reviewId=${reviewId}`;
    },
    error: function (response) {
      alert('댓글 수정에 실패하였습니다!');
    },
  });
}

function get_backBtnURL(performId, reviewId) {
  let temp_html = `
  <button class='commentWriteBackBtn' 
   onclick="location.href='/render-review/comment?id=${performId}&reviewId=${reviewId}'">
    취소
  </button>`;

  $('.reviewCreateBtnBox').append(temp_html);
}

// /render-review/comment?id=PF214506&reviewId=29
