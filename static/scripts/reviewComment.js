$(document).ready(function () {
  get_backBtnURL();
  get_reviews(reviewId);
  get_comments(reviewId);
  get_commentBtns(reviewId);
  get_poster(performId);
  get_stars(performId);
  get_performInfo(performId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');
const reviewId = Number(searchParams.get('reviewId'));

// '뒤로가기'버튼의 이동경로에 performId 삽입
function get_backBtnURL() {
  let temp_html = `<button
  class="BackBtn"
  onclick="location.href='/render-content/?id=${performId}'"
  >
  뒤로가기</button>`;
  $('.BtnsBox').append(temp_html);
}

// 해당 리뷰 상세내용 불러오기
function get_reviews(reviewId) {
  $.ajax({
    type: 'GET',
    url: `/review/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      let e = response.review;
      let reviewId = e.id;
      let date = new Date(e.createdAt).toLocaleString().slice(0, -3);
      let content = e.review;
      let stars =
        `<img src="img/starGold.png" style="height: 20px" />&nbsp;`.repeat(
          e.rating
        );

      let temp_html = `<div class="reviewBox">
      <div class="starDateBox">
        <span class="starBox"
          >${stars}</span>
        <span class="dateBox">${date}</span>
      </div>
      <div class="reviewContent">
      ${content}
      </div>      
    </div>`;
      $('.reviewsContainer').append(temp_html);
    },
    error: function (response) {
      alert('리뷰 작성 실패!');
    },
  });
}

// 해당 리뷰 모든 댓글 불러오기
function get_comments(reviewId) {
  $.ajax({
    type: 'GET',
    url: `/comments/get/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      for (const e of response.data) {
        let commentId = e.id;
        let userId = e.userId;
        let comment = e.comment;
        let date = new Date(e.createdAt).toLocaleString().slice(0, -3);

        $.ajax({
          type: 'GET',
          url: `/user/get/${userId}`,
          data: { userId },
          success: function (response) {
            let userName = response.name;

            let temp_html = `
              <div class="commentBox">
                <div class="commentDateBox"> 
                  <span class="nameBox"><img src="img/user.png" style="height: 20px"/>&nbsp;${userName}</span>
                  <span class="dateBox">${date}</span>
                </div>
                <div class="reviewContent">
                ${comment}
                </div>
                <div class="iconBox${commentId}" id="iconBox${commentId}">                
                </div>
              </div>`;
            $('.commentsContainer').append(temp_html);
          },
          error: function (response) {
            alert('user 실패!');
          },
        });
      }
    },
    error: function (response) {
      alert('comment 실패!');
    },
  });
}

function get_commentBtns(reviewId) {
  $.ajax({
    type: 'GET',
    url: `/comments/get/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      for (const e of response.data) {
        let commentId = e.id;
        let userId = e.userId;
        let currentUserId = response.currentUserId;
        let comment = e.comment;
        let date = new Date(e.createdAt).toLocaleString().slice(0, -3);

        if (userId !== currentUserId) continue;

        $.ajax({
          type: 'GET',
          url: `/user/get/${userId}`,
          data: { userId },
          success: function (response) {
            let userName = response.name;

            let temp_html = `
            <button class="likeBtn" 
            onclick="location.href='/reviews/update?id=${performId}&reviewId=${reviewId}&commentId=${commentId}'">
            <img src="img/edit.png" style="height: 20px" />&nbsp;수정
          </button>&nbsp;
          <button class="commentBtn"
            onclick="delete_comment(${commentId})">
            <img src="img/trash.png" style="height: 20px" />&nbsp;삭제
          </button>`;
            $(`.iconBox${commentId}`).append(temp_html);
          },
          error: function (response) {
            alert('user 실패!');
          },
        });
      }
    },
    error: function (response) {
      alert('comment 실패!');
    },
  });
}

// 해당 리뷰 댓글 작성하기
function create_review(reviewId) {
  let comment = $('#commentContent').val();

  $.ajax({
    type: 'POST',
    url: `/comments/create/${reviewId}`,
    data: {
      reviewId,
      comment,
    },
    success: function (response) {
      alert('댓글 작성이 완료되었습니다!');
      window.location.reload();
    },
    error: function (response) {
      alert('댓글 작성 실패!');
    },
  });
}

// 해당 댓글 삭제
function delete_comment(commentId) {
  $.ajax({
    type: 'DELETE',
    url: `/comments/delete/${commentId}`,
    data: { commentId },
    success: function (response) {
      alert('댓글 삭제가 정상적으로 완료되었습니다!');
      window.location.reload();
    },
    error: function (response) {
      alert('댓글 삭제에 실패하였습니다!');
    },
  });
}

// 해당 공연 별점 평균 불러오기
function get_stars(performId) {
  $.ajax({
    type: 'GET',
    url: `/review/${performId}/reviews`,
    data: { performId },
    success: function (response) {
      const arr = response.reviews;
      const end = response.reviews.length;
      let sum = 0;
      for (let i = 0; i < end; i++) {
        sum += arr[i].rating;
      }
      let average = Math.round((sum / end) * 100) / 100;

      let temp_html = `<img src="img/starGold.png" style="height: 20px" />
        &nbsp;${average}`;
      $('.starAvgBox').append(temp_html);
    },
    error: function (response) {
      alert('리뷰 작성 실패!');
    },
  });
}

// 해당 공연 포스터 불러오기
function get_poster(performId) {
  $.ajax({
    type: 'GET',
    url: `/content/onePerform/${performId}`,
    data: { performId },
    success: function (response) {
      const e = response.data;
      let poster = e.poster;

      let temp_html = `
      <img
      class="detailPoster"
      src="${poster}"
    />`;
      $('.posterbox').append(temp_html);
    },
    error: function (response) {
      alert('info load 실패!');
    },
  });
}

// 해당 공연 상세정보 불러오기
function get_performInfo(performId) {
  $.ajax({
    type: 'GET',
    url: `/content/onePerform/${performId}`,
    data: { performId },
    success: function (response) {
      const e = response.data;
      let performName = e.performName;
      let theater = e.theater;
      let genreName = e.genreName;
      let performStatus = e.performStatus;
      let startDate = e.startDate;
      let endDate = e.endDate;

      let temp_html = `
        <p>제목 : ${performName}</p>
        <p>장소 : ${theater}</p>
        <p>장르 : ${genreName}</p>
        <p>상태 : ${performStatus}</p>
        <p>시작 : ${startDate}</p>
        <p>종료 : ${endDate}</p>`;
      $('.InfoBox').append(temp_html);
    },
    error: function (response) {
      alert('info load 실패!');
    },
  });
}
