// 검색 결과 공연 불러오기
function get_search(page) {
  let search = document.getElementById('inputSearch').value;
  console.log('js', search);
  $.ajax({
    type: 'GET',
    url: `/content/getSearch/${search}`,
    data: { page, search },
    success: function (response) {
      console.log('리스폰스', response);
      console.log('페폼', response.performs);
      console.log('e', response.performs[0]);
      console.log('e', Array.isArray(response.performs[0]));

      console.log('총게시물수', response.performs[1]);

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
    },
    error: function (response) {
      alert('불러오기 실패!');
    },
  });
}
