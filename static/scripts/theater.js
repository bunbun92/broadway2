$(document).ready(function () {
  getTheaterList();
  getMyTheaters();
  getMyTheatersContent();
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
        $('#my-theaters-select').append(option);
      }
    },
  });
}

function getMyTheatersContent() {
  $.ajax({
    type: 'GET',
    url: '/theaters/myList',
    data: {},
    success: function (response) {
      const rows = response;

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['theater'] + '</option>');
        $('#my-theaters-select-content').append(option);
      }
    },
  });
}

function getMyTheaterPerforms() {
  let theaterName = $('#my-theater-choice-price').val();

  console.log(theaterName, typeof theaterName);

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

function getMyPerformsContent() {
  let theaterName = $('#my-theater-choice-content').val();

  console.log(theaterName, typeof theaterName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerforms/${theaterName}`,
    data: {},
    success: function (response) {
      const rows = response;
      // console.log(rows);
      $('#my-performs-select-content').empty();

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i] + '</option>');
        $('#my-performs-select-content').append(option);
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
      alert(response['message']);
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
          alert(response['message']);
          location.reload();
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
          alert(response['message']);
          location.reload();
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
          alert(response['message']);
          location.reload();
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
          alert(response['message']);
          location.reload();
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
          alert(response['message']);
          location.reload();
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
          alert(response['message']);
          location.reload();
        },
      });
    }
  }
}

function getPerformInfoForContent() {
  let performName = $('#my-perform-choice-content').val();
  // console.log(performName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerformId/${performName}`,
    data: {},
    success: function (response) {
      console.log(response);

      performId = response['performId'];
      performStartDate = response['startDate'];
      performEndDate = response['endDate'];

      createContent(performId, performStartDate, performEndDate);
    },
  });
}

function createContent(performId, performStartDate, performEndDate) {
  let startDate = $('#start-date').val();
  let endDate = $('#end-date').val();
  let startTime = $('#start-time').val();
  let endTime = $('#end-time').val();

  let performLength = timeDifference(startTime, endTime);

  const performDatesArray = getAllDates(startDate, endDate);

  // console.log(startDate + ' ' + startTime, endDate + ' ' + startTime);
  // console.log(startTime, endTime, performLength);
  // console.log(performDatesArray);

  let validPerformDate = validatePerformDates(performStartDate, performEndDate);
  console.log(validPerformDate, typeof validPerformDate);

  if (validPerformDate === true) {
    console.log('승인');

    for (let i = 0; i < performDatesArray.length; i++) {
      // console.log(performDatesArray[i]);

      let performRound = i + 1;
      let performDate = performDatesArray[i] + ' ' + startTime;
      let performTime = performLength;

      console.log('POST', performRound, performDate, performTime);
      $.ajax({
        type: 'POST',
        url: `/perform/myPerformList/${performId}`,
        data: {
          performRound,
          performDate,
          performTime,
        },
        success: function (response) {},
      });
    }
    alert('공연 정보 생성을 완료하였습니다.');
  } else {
    alert('유효한 공연 기간이 아닙니다. 공연 일자를 확인해주세요');
  }
}

function validatePerformDates(performStartDate, performEndDate) {
  let startDate = $('#start-date').val();
  let endDate = $('#end-date').val();

  let inputStartDate = new Date(startDate);
  let inputEndDate = new Date(endDate);
  inputStartDate.setHours(inputStartDate.getHours() - 9);
  inputEndDate.setHours(inputEndDate.getHours() - 9);
  let startDateInDB = new Date(performStartDate);
  let endDateInDB = new Date(performEndDate);

  console.log(inputStartDate);
  console.log(startDateInDB);
  console.log(inputEndDate);
  console.log(endDateInDB);

  if (inputStartDate >= startDateInDB && inputEndDate <= endDateInDB) {
    return true;
  } else {
    return false;
  }
}

function timeDifference(startTime, endTime) {
  let startHour = parseInt(startTime.split(':')[0]);
  let startMinute = parseInt(startTime.split(':')[1]);

  let endHour = parseInt(endTime.split(':')[0]);
  let endMinute = parseInt(endTime.split(':')[1]);

  let startTimeInMinutes = startHour * 60 + startMinute;
  let endTimeInMinutes = endHour * 60 + endMinute;

  let diffInMinutes = endTimeInMinutes - startTimeInMinutes;

  return diffInMinutes;
}

function getAllDates(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  let endDateFormatted = new Date(endDate);

  // console.log('array', currentDate, endDateFormatted);

  while (currentDate <= endDateFormatted) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
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
