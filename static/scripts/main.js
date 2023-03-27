$(document).ready(function () {
  get_performs();
});

// header 검색기능
function filter() {
  let search = document.getElementById('search').value.toLowerCase();
  let perform = document.getElementsByClassName('postboxes');
  for (let i = 0; i < perform.length; i++) {
    performTitle = perform[i].getElementsByClassName('performTitle');
    if (performTitle[0].innerHTML.toLowerCase().includes(search)) {
      perform[i].style.display = 'flex';
    } else {
      perform[i].style.display = 'none';
    }
  }
}

// 모든 공연 불러오기
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
      let title = e.performName;
      let temp_html = `
      <div class="postboxes">
        <img
          class="posts"
          src="${posterImg}"
        />
        <div class="performTitle">${title}</div>
        <div class="buttons">
          <button class="specBtn" onclick="location.href='/render-content/?id=${performId}'">상세정보</button>
          <button class="reserveBtn" onclick="location.href='/render-order-seats/performRoundList?performId=${performId}'">예매하기</button>
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
