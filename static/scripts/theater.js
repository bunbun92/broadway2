$(document).ready(function () {
  getTheaterList();
  getMyTheaters();
});

function getTheaterList() {
  $.ajax({
    type: 'GET',
    url: '/theaters',
    data: {},
    success: function (response) {
      const rows = response;
      console.log(rows);

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
      console.log(response['id']);
      createTheaterSeatsById(response['id']);
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
      location.reload();
    },
  });
}
