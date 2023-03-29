$(document).ready(function () {
  get_contents(1);
});

// content table의 공연을 perform table에서 공연정보 불러오기 - 페이지네이션
function get_contents(page) {
  $.ajax({
    type: 'GET',
    url: '/content/getAll',
    data: { page },
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
          pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="get_performs(${i})">${i}</a></li>`;
        } else {
          pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="get_performs(${i})">${i}</a></li>`;
        }
      }
      let AvoidDuplication = [];

      for (let e of performData) {
        let performId = e.performId;
        if (!AvoidDuplication.includes(performId)) {
          AvoidDuplication.push(performId);
        } else {
          continue;
        }

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
  });
}

// // perform table '공연중'인 공연정보 불러오기 - 페이지네이션
// function get_performs(page) {
//   $.ajax({
//     type: 'GET',
//     url: '/content/getAllContents',
//     data: { page },
//     success: function (response) {
//       console.log('리스폰스', response);
//       console.log('페폼', response.performs);
//       console.log('e', response.performs[0]);
//       console.log('e', Array.isArray(response.performs[0]));

//       console.log('총게시물수', response.performs[1]);

//       let totalPage = Math.ceil(response.performs[1] / 12);
//       console.log('토탈', totalPage);

//       let performData = response.performs[0];

//       const productList = document.getElementById('postsWrap');
//       const pageList = document.getElementById('pageNo');
//       pageList.innerHTML = '';
//       productList.innerHTML = '';

//       for (let i = 1; i < totalPage + 1; i++) {
//         if (i === page) {
//           pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="get_performs(${i})">${i}</a></li>`;
//         } else {
//           pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="get_performs(${i})">${i}</a></li>`;
//         }
//       }

//       for (let e of performData) {
//         let performId = e.performId;
//         let posterImg = e.poster;
//         let title = e.performName;
//         let temp_html = `
//       <div class="postboxes">
//         <img
//           class="posts"
//           src="${posterImg}"
//         />
//         <div class="performTitle">${title}</div>
//         <div class="buttons">
//           <button class="specBtn"
//           onclick="location.href='/render-content/?id=${performId}'">상세정보</button>
//           <button class="reserveBtn"
//           onclick="location.href='/render-order-seats/performRoundList?performId=${performId}'">예매하기</button>
//         </div>
//       </div>`;
//         $('.postsWrap').append(temp_html);
//       }
//     },
//   });
// }

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

// // header 검색기능
// function filter() {
//   let search = document.getElementById('search').value.toLowerCase();
//   let perform = document.getElementsByClassName('postboxes');
//   for (let i = 0; i < perform.length; i++) {
//     performTitle = perform[i].getElementsByClassName('performTitle');
//     if (performTitle[0].innerHTML.toLowerCase().includes(search)) {
//       perform[i].style.display = 'flex';
//     } else {
//       perform[i].style.display = 'none';
//     }
//   }
// }
