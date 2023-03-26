$(document).ready(function () {
  get_reviewCreateBtnURL();
  get_poster(performId);
  get_stars(performId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');

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

// '리뷰 작성하기'버튼의 이동경로에 performId 삽입
function get_reviewCreateBtnURL() {
  let temp_html = `<button
  class="BackBtn"
  onclick="location.href='/render-content/?id=${performId}'"
  >
  뒤로가기</button>`;
  $('.reviewCreateBtnBox').append(temp_html);
}

// 해당 공연 리뷰 작성하기
function create_review(performId) {
  let rating = Number($('#starIndex').val());
  let review = $('#reviewContent').val();

  $.ajax({
    type: 'POST',
    url: '/review/create',
    data: {
      performId,
      rating,
      review,
    },
    success: function (response) {
      alert('리뷰 작성이 완료되었습니다!');
      window.location.replace(`/render-content/?id=${performId}`);
    },
    error: function (response) {
      alert('리뷰 작성 실패!');
    },
  });
}
