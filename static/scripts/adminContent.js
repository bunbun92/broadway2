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
  getMyTheaters();
  getMyContentsPerformName();
  // getMyTheatersContent();
  $('.input-daterange').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
  });
});

function getMyTheaters() {
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

// contents의 공연 제목 datalist append
function getMyContentsPerformName() {
  $.ajax({
    type: 'GET',
    url: '/perform/myPerformList',
    data: {},
    success: function (response) {
      const rows = response;
      console.log(rows);

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['ka_performName'] + '</option>');
        $('#my-contents-select-for-seats').append(option);
      }
      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i]['ka_performName'] + '</option>');
        $('#my-contents-select-for-timesale').append(option);
      }
    },
  });
}

function getMyContentsPerformId() {
  let performName = $('#my-contents-choice-for-seats').val();
  console.log(performName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerformId/${performName}`,
    data: {},
    success: function (response) {
      performId = response['performId'];
      getMyContensList(performId);
    },
  });
}

function getMyContensList(performId) {
  console.log('성공', performId);

  $.ajax({
    type: 'GET',
    url: `/perform/myContentsList/${performId}`,
    data: {},
    success: function (response) {
      console.log('res', response);
      appendContentsList(response);
    },
  });
}

function appendContentsList(res) {
  let performName = $('#my-contents-choice-for-seats').val();
  $('#contents-list').empty();

  for (let i = 0; i < res.length; i++) {
    let performId = res[i]['performId'];
    let performRound = res[i]['performRound'];
    let performDate = res[i]['performDate'];
    let performTime = res[i]['performTime'];

    let temp_html = `<li class="list-group-item">
    <input class="form-check-input me-1" id="seats-${performId}-${performRound}" type="checkbox" value="" aria-label="..." />
      <table>
        <td id="">&nbsp;${performId}&nbsp;</td>
        <td id="">&nbsp;${performRound}회차&nbsp;</td>
        <td id="">&nbsp;${performName}&nbsp;</td>
        <td id="">&nbsp;${performDate}&nbsp;</td>
        <td id="">&nbsp;${performTime}분&nbsp;</td>
      </table>               
    </li>`;
    $('#contents-list').append(temp_html);
  }
}

// 타임세일

function getMyContentsPerformIdTimeSale() {
  let performName = $('#my-contents-choice-for-timesale').val();
  console.log(performName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerformId/${performName}`,
    data: {},
    success: function (response) {
      performId = response['performId'];
      getMyContensListTimeSale(performId);
    },
  });
}

function getMyContensListTimeSale(performId) {
  console.log('성공', performId);

  $.ajax({
    type: 'GET',
    url: `/perform/myContentsList/${performId}`,
    data: {},
    success: function (response) {
      console.log('res', response);
      appendContentsListTimeSale(response);
    },
  });
}

function appendContentsListTimeSale(res) {
  let performName = $('#my-contents-choice-for-timesale').val();
  $('#contents-list-timesale').empty();

  for (let i = 0; i < res.length; i++) {
    let performId = res[i]['performId'];
    let performRound = res[i]['performRound'];
    let performDate = res[i]['performDate'];
    let performTime = res[i]['performTime'];
    let temp_html = `<li class="list-group-item">
    <input class="form-check-input me-1" id="timesale-${performId}-${performRound}" type="checkbox" value="" aria-label="..." />
      <table>
        <td id="">&nbsp;${performId}&nbsp;</td>
        <td id="">&nbsp;${performRound}회차&nbsp;</td>
        <td id="">&nbsp;${performName}&nbsp;</td>
        <td id="">&nbsp;${performDate}&nbsp;</td>
        <td id="">&nbsp;${performTime}분&nbsp;</td>
      </table>               
    </li>`;
    $('#contents-list-timesale').append(temp_html);
  }
}

function createTimeSaleGetPerformId() {
  let performName = $('#my-contents-choice-for-timesale').val();
  console.log(performName);

  $.ajax({
    type: 'GET',
    url: `/theaters/getPerformId/${performName}`,
    data: {},
    success: function (response) {
      performId = response['performId'];
      createTimeSaleGetList(performId);
    },
  });
}

function createTimeSaleGetList(performId) {
  $.ajax({
    type: 'GET',
    url: `/perform/myContentsList/${performId}`,
    data: {},
    success: function (response) {
      console.log('res', response);
      createTimeSaleInfo(response, performId);
    },
  });
}

function createTimeSaleInfo(res, performId) {
  let performName = $('#my-contents-choice-for-timesale').val();
  let startTime =
    $('#timesale-start-date').val() + ' ' + $('#timesale-start-time').val();
  let endTime =
    $('#timesale-end-date').val() + ' ' + $('#timesale-end-time').val();
  let rate = $('#timesale-rate').val() / 100;

  for (let i = 0; i < res.length; i++) {
    let contentId = res[i]['id'];
    let checkboxTimeSale = $(`#timesale-${performId}-${i + 1}`).prop('checked');

    if (checkboxTimeSale === true) {
      console.log('타임세일', contentId, startTime, endTime, rate);
      $.ajax({
        type: 'POST',
        url: `/time-sale/create/${contentId}`,
        data: {
          startTime,
          endTime,
          rate,
        },
        success: function (response) {},
      });
    }
  }
}
