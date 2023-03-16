$(document).ready(function () {
  getMySpec(userId);
});

const params = window.location.pathname.split('/')[1];
const userId = Number(params);
console.log(params);

function getMySpec(userId) {
  $.ajax({
    type: 'GET',
    url: `/user/${userId}`,
    data: {},
    success: function (response) {
      for (let e of response) {
        let id = e.userId;
        let pw = e.password;
        let name = e.name;
        let email = e.email;
        let type = e.userType;
        let temp_html = `<a class ="divTextHidden" href="/${id}"><div class="products">
                            <div class="photoBox">
                              <img src="${photo}"/>
                            </div>
                            <p>${name}</p>
                            <p>${price}원</p>
                          </div></a>
                          <div class = "displayNone">${spec}${quantity}${count}${created}${updated}</div>`;
        $('.product_list').append(temp_html);
      }
    },
  });
}
