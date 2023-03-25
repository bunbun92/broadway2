function logout() {
  $.ajax({
    type: 'POST',
    url: '/user/logout',
    success: function (response) {
      alert('로그아웃에 성공하였습니다.');
      window.location.href = '/render-user/home';
    },
    error: function (response) {
      alert('로그아웃에 실패하였습니다.');
    },
  });
}

$(document).ready(function () {
  get_performs();
});

function get_performs() {
  $.ajax({
    type: 'GET',
    url: '/content/getone',
    data: {},
    success: function (response) {
      console.log('리스폰스', response);
      console.log('리스폰스.content', response.content);
      console.log('리스폰스.content.performId', response.content.performId);

      // for (let e of response.content) {
      let e = response.content;
      let performId = e.performId;
      let posterImg = e.poster;
      let temp_html = `<div class="postboxes">
        <img
          class="posts"
          src="${posterImg}"
        />
        <div class="buttons">
          <button class="specBtn" onclick="location.href='/render-content/?id=${performId}'">상세정보</button>
          <button class="reserveBtn" ">예매하기</button>
        </div>
      </div>`;
      $('.postsWrap').append(temp_html);
      // }
    },
  });
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}
