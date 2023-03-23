$(document).ready(function () {
  getTheaterList();
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
      console.log(rows);

      for (let i = 0; i < rows.length; i++) {
        const option = $('<option>' + rows[i] + '</option>');
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
