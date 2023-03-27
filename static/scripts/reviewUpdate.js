$(document).ready(function () {
  get_reviews(reviewId);
});

const searchParams = new URLSearchParams(location.search);
const reviewId = Number(searchParams.get('id'));

function get_reviews(reviewId) {
  $.ajax({
    type: 'GET',
    url: `/review/${reviewId}`,
    data: { reviewId },
    success: function (response) {
      let e = response.review;
      let content = e.review;

      let temp_html = `
      <div class="inputsBox">
        <div class="starInputBox">
          <div class="input-group mb-3">
            <label
              class="input-group-text"
              for="starIndex"
              style="width: 200px"
              >별점</label
            >
            <select class="form-select" id="starIndex">
              <option selected>-- 별점 선택 --</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
              </select>
          </div>
        </div>
          <div class="reviewInputs">
            <div class="input-group" style="height: 350px">
              <span class="input-group-text" style="width: 200px"
                >리뷰 내용</span
              >
              <textarea
                class="form-control"
                aria-label="With textarea"
                id="reviewContent"
              >${content}</textarea>
            </div>
          </div>
        </div>
        <div class="reviewCreateBtns">
          <div class="reviewCreateBtnBox" , id="reviewCreateBtnBox">
          <button class="BackBtn" onclick="location.href='/render-review/manage'">
          취소
        </button></div>
          <button class="reviewWriteBtn" onclick="update_review(${reviewId})">
            리뷰 수정
          </button>
        </div>
      </div> `;
      $('.createReviewZone').append(temp_html);
    },
    error: function (response) {
      alert('리뷰 수정 실패!');
    },
  });
}

// 해당 리뷰 수정
function update_review(reviewId) {
  let rating = Number($('#starIndex').val());
  let review = $('#reviewContent').val();
  console.log(typeof rating);
  console.log(typeof review);
  console.log(typeof reviewId);

  $.ajax({
    type: 'PUT',
    url: `/review/update/${reviewId}`,
    data: {
      reviewId,
      rating,
      review,
    },
    success: function (response) {
      alert('리뷰 수정이 완료되었습니다!');
      window.location.reload();
    },
    error: function (response) {
      alert('리뷰 수정에 실패하였습니다!');
    },
  });
}
