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
  getTheaterList();
  getMyTheaters();
  // getMyTheatersContent();
  $('.input-daterange').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
  });
});

function getTheaterList() {
  $.ajax({
    type: 'GET',
    url: '/theaters',
    data: {},
    success: function (response) {
      const rows = response;
      // console.log(rows);

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i] + '</option>');
        $('#theaters-select').append(option);
      }
    },
  });
}

function getMyTheaters() {
  $.ajax({
    type: 'GET',
    url: '/theaters/myList',
    data: {},
    success: function (response) {
      const rows = response;

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['theater'] + '</option>');
        $('#delete-theaters-select').append(option);
      }
      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['theater'] + '</option>');
        $('#my-theaters-select-price').append(option);
      }
      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['theater'] + '</option>');
        $('#my-theaters-select').append(option);
      }
    },
  });
}

// function getMyTheatersContent() {
//   $.ajax({
//     type: 'GET',
//     url: '/theaters/myList',
//     data: {},
//     success: function (response) {
//       const rows = response;

//       for (let i = 0; i < rows.length; i++) {
//         const option = $('<option>' + rows[i]['theater'] + '</option>');
//         $('#my-theaters-select-content').append(option);
//       }
//     },
//   });
// }

function getMyTheaterIdForDelete() {
  let theaterName = $('#delete-theater-choice').val();

  $.ajax({
    type: 'GET',
    url: `/theaters/getTheaterId/${theaterName}`,
    data: {},
    success: function (response) {
      // console.log(response['id']);
      theaterId = response['id'];
      deleteMyTheaterByTheaterId(theaterId);
    },
  });
}

function deleteMyTheaterByTheaterId(theaterId) {
  let theaterName = $('#delete-theater-choice').val();

  $.ajax({
    type: 'DELETE',
    url: `/theaters/deleteTheater/${theaterId}`,
    data: {},
    success: function (response) {
      alert(theaterName + '을 내 극장 목록에서 삭제하였습니다.');
    },
  });
}

function getMyTheaterPerforms() {
  let theaterName = $('#my-theater-choice-price').val();

  // console.log(theaterName, typeof theaterName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerforms/${theaterName}`,
    data: {},
    success: function (response) {
      const rows = response;
      // console.log(rows);
      $('#my-performs-select').empty();

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i] + '</option>');
        $('#my-performs-select').append(option);
      }
    },
  });
}

function addMyTheater() {
  let theater = $('#theater-choice').val();

  console.log(theater);
  $.ajax({
    type: 'POST',
    url: '/theaters/createTheater',
    data: { theater },
    success: function (response) {},
  });
}

function createTheaterSeats() {
  let theaterName = $('#my-theater-choice').val();

  console.log(theaterName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getTheaterId/${theaterName}`,
    data: {},
    success: function (response) {
      // console.log(response['id']);
      theaterId = response['id'];
      createTheaterSeatsById(theaterId);
    },
  });
}

function createTheaterSeatsById(theaterId) {
  let theaterName = $('#my-theater-choice').val();
  let maxRowIndexText = $('#max-row-index').val();
  let maxColumnIndex = parseInt($('#max-column-index').val());

  let maxRowIndex = maxRowIndexText.charCodeAt(0) - 64;

  // console.log(theaterId, maxRowIndex, maxColumnIndex);

  $.ajax({
    type: 'POST',
    url: '/theaters/createSeats',
    data: {
      theaterId,
      maxRowIndex,
      maxColumnIndex,
    },
    success: function (response) {
      alert(theaterName + '의 좌석 배치 정보를 생성하였습니다.');
      printSeatsById(theaterId);
    },
  });
}

function createPriceInfoGetTheaterId() {
  let theaterName = $('#my-theater-choice-price').val();

  console.log(theaterName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getTheaterId/${theaterName}`,
    data: {},
    success: function (response) {
      console.log(response['id']);
      createPriceInfoGetPerformId(response['id']);
    },
  });
}

function createPriceInfoGetPerformId(theaterId) {
  let performName = $('#my-perform-choice').val();

  // console.log(performName, theaterId);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerformId/${performName}`,
    data: {},
    success: function (response) {
      console.log(response['performId']);

      performId = response['performId'];
      createPriceInfo(theaterId, performId);
    },
  });
}

function createPriceInfo(theaterId, performId) {
  let checkBoxNoGrade = $('#check-no-grade-seat').prop('checked');
  let checkBoxVIP = $('#check-vip-seat').prop('checked');
  let checkBoxR = $('#check-r-seat').prop('checked');
  let checkBoxS = $('#check-s-seat').prop('checked');
  let checkBoxA = $('#check-a-seat').prop('checked');
  let checkBoxB = $('#check-b-seat').prop('checked');
  let priceNoGrade = parseInt($('#price-no-grade-seat').val());
  let priceVIP = parseInt($('#price-vip-seat').val());
  let priceR = parseInt($('#price-r-seat').val());
  let priceS = parseInt($('#price-s-seat').val());
  let priceA = parseInt($('#price-a-seat').val());
  let priceB = parseInt($('#price-b-seat').val());

  console.log(theaterId, performId);
  if (
    checkBoxNoGrade &&
    (checkBoxVIP || checkBoxR || checkBoxS || checkBoxA || checkBoxB)
  ) {
    alert('등급 구분 없음과 등급별 가격은 같이 설정할 수 없습니다.');
  } else {
    if (checkBoxNoGrade) {
      console.log('No Grade', checkBoxNoGrade, priceNoGrade);
      let price = priceNoGrade;
      let grade = -1;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('등급 구분이 없는 공연의 가격 정보를 등록하였습니다.');
        },
      });
    }
    if (checkBoxVIP) {
      console.log('VIP', checkBoxVIP, priceVIP);
      let price = priceVIP;
      let grade = 1;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('VIP석 가격 정보를 등록하였습니다.');
        },
      });
    }
    if (checkBoxR) {
      console.log('R', checkBoxR, priceR);
      let price = priceR;
      let grade = 2;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('R석 가격 정보를 등록하였습니다.');
        },
      });
    }
    if (checkBoxS) {
      console.log('S', checkBoxS, priceS);
      let price = priceS;
      let grade = 3;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('S석 가격 정보를 등록하였습니다.');
        },
      });
    }
    if (checkBoxA) {
      console.log('A', checkBoxA, priceA);
      let price = priceA;
      let grade = 4;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('A석 가격 정보를 등록하였습니다.');
        },
      });
    }
    if (checkBoxB) {
      console.log('B', checkBoxB, priceB);
      let price = priceB;
      let grade = 5;

      $.ajax({
        type: 'POST',
        url: '/theaters/createPriceInfo',
        data: {
          grade,
          price,
          performId,
          theaterId,
        },
        success: function (response) {
          alert('B석 가격 정보를 등록하였습니다.');
        },
      });
    }
  }
}

function printSeats() {
  let theaterName = $('#my-theater-choice').val();

  console.log(theaterName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getTheaterId/${theaterName}`,
    data: {},
    success: function (response) {
      console.log(response);
      printSeatsById(response['id']);
    },
  });
}

function printSeatsById(theaterId) {
  $.ajax({
    type: 'GET',
    url: `/theaters/printSeats/${theaterId}`,
    success: function (response) {
      //좌석 전체 출력
      let rows = response;
      console.log(rows);

      let tempHtml = `<div class="seatsHorizontalLine">`;
      let currentSeatAlphabet = 'A';

      document.getElementById('seats').innerHTML = '';

      for (let i = 0; i < rows.length; i++) {
        let seatAlphabet = rows[i].seat[0];
        let seat = rows[i].seat;
        if (seatAlphabet !== currentSeatAlphabet) {
          currentSeatAlphabet = seatAlphabet;

          tempHtml += `</div><div class="seatsHorizontalLine">`;
        }
        tempHtml += `<span class="seat" id= "${seat}">${seat}</span>`;
      }

      tempHtml += `</div>`;

      $('#seats').append(tempHtml);
    },
  });

  return;
}
