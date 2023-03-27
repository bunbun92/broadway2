$(document).ready(function () {
  get_buttonURL();
  get_reviews(performId, 1);
  get_poster(performId);
  get_stars(performId);
  get_performInfo(performId);
});

const searchParams = new URLSearchParams(location.search);
const performId = searchParams.get('id');

// '리뷰 작성하기'버튼의 이동경로에 performId 삽입
function get_buttonURL() {
  let temp_html = `
  <button class="manageBtn"onclick="location.href='/render-review/manage'">내 게시물 관리</button>
  <button
      class="reviewWriteBtn"
      onclick="location.href='/render-review/create?id=${performId}'"
    >
      리뷰 작성하기
    </button>
  `;
  $('.reviewWriteBtnBox').append(temp_html);
}

// 해당 공연 모든 리뷰 불러오기
function get_reviews(performId, page) {
  $.ajax({
    type: 'GET',
    url: `/review/${performId}/reviews`,
    data: { performId, page },
    success: function (response) {
      // let dataCount = response.reviews.length;
      // console.log('datacount', response.reviews.length);
      // console.log('datacount', dataCount);
      // for (let i = 1; i < dataCount + 1; i++) {
      //   if (i === page) {
      //     $('.pagination').append(
      //       `<li class="page-item active"><a class="page-link" onclick="get_reviews(${i})">${i}</a></li>`
      //     );
      //   } else {
      //     $('.pagination').append(
      //       `<li class="page-item"><a class="page-link" onclick="get_reviews(${i})">${i}</a></li>`
      //     );
      //   }
      // }

      for (const e of response.reviews) {
        let userId = e.userId;
        let reviewId = e.id;
        let date = new Date(e.createdAt).toLocaleString().slice(0, -3);
        let content = e.review;
        let stars =
          `<img src="img/starGold.png" style="height: 20px" />&nbsp;`.repeat(
            e.rating
          );

        $.ajax({
          type: 'GET',
          url: `/comments/get/${reviewId}`,
          data: { reviewId },
          success: function (response) {
            let commentCount = 0;
            for (const e of response.data) {
              commentCount += 1;
            }

            $.ajax({
              type: 'GET',
              url: `/user/get/${userId}`,
              data: { userId },
              success: function (response) {
                console.log('res', response);
                let userName = response.name;

                let temp_html = `
        <div class="reviewBox">
        <span class="nameBox"><img src="img/user.png" style="height: 20px"/>&nbsp;${userName}</span>

          <div class="starDateBox">
            <span class="starBox"
              >${stars}</span>
            <span class="dateBox">${date}</span>
          </div>
          <div class="reviewContent">
          ${content}
          </div>
          <div class="iconBox">
            <button 
              class="commentBtn"
              onclick="location.href='/render-review/comment?id=${performId}&reviewId=${reviewId}'"
              >
              <img src="img/comment.png" style="height: 20px" />&nbsp;${commentCount}
              Comments
            </button>
          </div>
        </div>`;
                $('.reviewsContainer').append(temp_html);
              },
              error: function (response) {
                alert('user 실패!');
              },
            });
          },
        });
      }
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
