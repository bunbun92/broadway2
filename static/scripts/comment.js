$(document).ready(function () {
  const searchParams = new URLSearchParams(location.search);
  const reviewId = searchParams.get('id'); ///1
  getAll(reviewId); // 인자 정해짐  //2
  getComments(reviewId);
  $(document).on('click', '#update-comment', function (event) {
    $('.row3').show();
    console.log($(this).data('id'));
    $('#slectedCommentId').val($(this).data('id')); // commentId
    console.log($('#slectedCommentId').val());

    $('#slecteduserId').val($(this).data('user')); // userId

    $('#slectedreviewId').val($(this).data('review')); // reviewId
  });

  $(document).on('click', '#delete-comment', function (event) {
    deleteComments($(this).data('id'));
  });
  $(document).on('click', '#aaa', function () {
    putComments();
    alert('gg');
  });
  // postComments(reviewId);
});
// 리뷰 = 댓글 리뷰 가져오구 그 뒤에 리뷰아이디 에 해당하는 comment

// get All 가져오기
function getAll(reviewId) {
  let review = null;
  let content = null;
  let Id = reviewId;

  console.log(Id);

  $.ajax({
    type: 'GET',
    url: `/review/${reviewId}`,
    success: function (data) {
      review = data;
    },
  }).then(function () {
    console.log(review.review.review);
  });

  $('#submit_Button').click(postComments.bind(null, Id));
}

function getComments(reviewId) {
  let conmment = null;

  $.ajax({
    type: 'GET',
    url: `/comments?reviewId=${reviewId}`,
    success: function (data) {
      getComments = data;
      console.log(getComments);

      getComments.map(comment => {
        console.log(comment);
        $('#commentId').append(
          `
          <tr>
            <td class="commentsId">${comment.id}</td>
            <td class="comments">${comment.comment}</td>
            <td class="user-name">${comment.user.name}</td>
            <td class="created-at">
              <time>${comment.createdAt}</time>
            </td>
            <td>
            <button type = "button" data-id =${comment.id} data-user =${comment.userId} data-review =${comment.reviewId} id ="update-comment">수정하기</button>
            <button type = "button" data-id =${comment.id} id ="delete-comment">삭제하기</button>
           
            </td>
          </tr>
          `
        );
      });
    },
  });
}

// 댓글수정하기
// input tag  빈칸에 수정하기
// 댓글작성 div 재활용  / 내용만 바꾸기

function postComments(reviewId) {
  let comment = $('#postComments').val();

  $.ajax({
    type: 'Post',
    url: `/comments`,
    data: {
      userId: 2,
      // userGuard 쓰는 방법 /
      // 1. 로그인 되는 사람만 글쓰기 사용 가능
      // 2. 획득 후 로그인 정보 가져오기
      comment,
      reviewId,
    },
    success: function (data) {
      window.location.reload();
    },
  });
}

function putComments() {
  let id = $('#slectedCommentId').val();
  let userId = $('#slecteduserId').val();
  let reviewId = $('#slectedreviewId').val();

  let comment = $('#putComments').val(); //comment 만 수정
  // let commentId = null

  console.log(id);
  $.ajax({
    type: 'PUT',
    // url: `/comments?reviewId=${reviewId}`,
    url: `/comments/${id}`,
    data: {
      userId,
      comment,
      reviewId,
    },
    success: function (data) {
      window.location.reload();
    },
  });
}

function deleteComments(id) {
  // 1. 수정하기 버튼 생성?
  // 2.
  // id 를 어디서 ?  //

  $.ajax({
    type: 'DELETE',
    // url: `/comments?reviewId=${reviewId}`,
    url: `/comments/${id}`,

    success: function (data) {
      window.location.reload();
    },
  });
}

// 1. comment
// 2. comment post
// 3. comment update
// 4. comment delete

// $.ajax({
//   type: 'GET',
//   url: `/review/${reviewId}`,
//   success: function (data) {
//     review = data;
//   },
// }).then(function () {
//   console.log(review.review.contentId);
//   $.ajax({
//     type: 'GET',
//     url: `/order-seats/content/${review.review.contentId}`,
//     success: function (data) {
//       // console.log(data);
//       content = data;
//     },
//   }).then(function () {
//     $.ajax({
//       type: 'GET',
//       url: `/comments`,
//       success: function (data) {
//         console.log(data);
//         comment = data;
//       },
//     })
//       .then(function () {
//         // innnerHTMLL 만들기
//         // console.log(review);
//         // console.log(review.review.review); //review 내용
//         // console.log(content);
//         // console.log(comment);
//         // console.log(comment[5].comment); // comment 내용
//         // console.log(comment[5].createdAt);
//         for (let i = 0; i < comment.length; i++) {
//           let commentIndex = comment[i].comment;
//           let createdTime = comment[i].createdAt;
//           // console.log(commentIndex);

//           $('#submit_Butten').click(function () {
//             $('#commentId').append(
//               `  <tr>
//                   <td class="title"><a>첫글</a></td>
//                   <td class="hashtag">#java</td>
//                   <td class="user-id">"${commentIndex}"</td>
//                   <td class="created-at">
//                     <time>"${createdTime}"</time>
//                   </td>
//                 </tr>`
//             );
//           });
//         }
//         //commentId = Id
//       })
//       .then(function () {
//         //post Comment
//         $('#submit_Comment').click(function () {
//           $('#commentInput').append(
//             `  <tr>
//                 <td class="title"><a>첫글</a></td>
//                 <td class="hashtag">#java</td>
//                 <td class="user-id">"${commentIndex}"</td>
//                 <td class="created-at">
//                   <time>"${createdTime}"</time>
//                 </td>
//               </tr>`
//           );
//         });

//         let userId = $('#userId').val();
//         let reviewId = $('#revieId').val();
//         let comment = String($('#userType').val());
//         $.ajax({
//           type: 'POST',
//           url: '/comments',
//           data: {
//             reviewId,
//             userId,
//             comment,
//           },
//           success: function (response) {
//             customAlert(response.message);
//             window.location.replace('/login');
//           },
//           error: function (response) {
//             // console.log('응, 아니야.', response);
//             // console.log('응, 아니야.');
//             customAlert(response.responseJSON.errorMessage);
//           },
//         });
//       });
//   });
// });
