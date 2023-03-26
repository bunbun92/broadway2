$(document).ready(function () {
  get_backBtnURL();
  get_reviews(reviewId);
  get_poster(performId);
  get_stars(performId);
  get_performInfo(performId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');
const reviewId = searchParams.get('reviewId');

// '뒤로가기'버튼의 이동경로에 performId 삽입
function get_backBtnURL() {
  let temp_html = `<button
  class="BackBtn"
  onclick="location.href='/render-content/?id=${performId}'"
  >
  뒤로가기</button>`;
  $('.BtnsBox').append(temp_html);
}

function get_reviews(reviewId) {
  $.ajax({
    type: 'GET',
    url: `/review/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      console.log(response);
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
      <div class="iconBox">
        <button class="likeBtn">
          <img src="img/heartPinkEmpty.png" style="height: 20px" />&nbsp;30
          Likes</button
        >&nbsp;&nbsp;
        <button 
        class="commentBtn"
        onclick="location.href='/render-review/comment?id=${performId}&reviewId=${reviewId}'"
        >
          <img src="img/comment.png" style="height: 20px" />&nbsp;45
          Comments
        </button>
      </div>
    </div>`;
      $('.reviewsContainer').append(temp_html);
    },
    error: function (response) {
      console.log('응, 아니야.', response);
      alert('리뷰 작성 실패!');
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
      console.log('응, 아니야.', response);
      alert('리뷰 작성 실패!');
    },
  });
}

// 해당 공연 포스터 불러오기
function get_poster(performId) {
  $.ajax({
    type: 'GET',
    url: '/content/onePerform/',
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
      console.log('응, 아니야.', response);
      alert('info load 실패!');
    },
  });
}

// 해당 공연 상세정보 불러오기
function get_performInfo(performId) {
  $.ajax({
    type: 'GET',
    url: '/content/onePerform/',
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
      console.log('응, 아니야.', response);
      alert('info load 실패!');
    },
  });
}
