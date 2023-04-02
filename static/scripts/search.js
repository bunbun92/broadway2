// 검색 결과 공연 불러오기
function get_search(page) {
  let search = document.getElementById('inputSearch').value;

  if (!search) {
    return alert('검색어를 입력해주세요.');
  }

  $.ajax({
    type: 'GET',
    url: `/content/getSearch/${search}`,
    data: { page, search },
    success: function (response) {
      // hide, show
      if (response.performs[1] === 0) {
        let temp_html = `
        <div class="reviewBox">
          <div class="reviewContent">
            검색 결과가 없습니다. <br>
            검색이 잘 안된다면, 한 글자 단위로 검색해주세요!
          </div>          
        </div>`;
        $('.postsWrap').append(temp_html);
      } else {
        let totalPage = Math.ceil(response.performs[1] / 12);
        console.log('토탈', totalPage);

        let performData = response.performs[0];

        const productList = document.getElementById('postsWrap');
        const pageList = document.getElementById('pageNo');
        pageList.innerHTML = '';
        productList.innerHTML = '';

        for (let i = 1; i < totalPage + 1; i++) {
          if (i === page) {
            pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="get_search(${i})">${i}</a></li>`;
          } else {
            pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="get_search(${i})">${i}</a></li>`;
          }
        }

        for (let e of performData) {
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
          <button class="specBtn"
          onclick="location.href='/render-content/?id=${performId}'">상세정보</button>
          <button class="reserveBtn"
          onclick="location.href='/render-order-seats/performRoundList?performId=${performId}'">예매하기</button>
        </div>
      </div>`;
          $('.postsWrap').append(temp_html);
        }
      }
    },
    error: function (response) {
      alert('불러오기 실패!');
    },
  });
}
