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
