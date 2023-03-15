function logout() {
  $.ajax({
    type: 'GET',
    url: '/api/auth/logout',
    success: function (response) {
      alert(response.message);
      window.location.href = '/login';
    },
    error: function (response) {
      alert(response.responseJSON.message);
    },
  });
}

// $(document).ready(function () {
//   get_products();
//   random_products();
// });

function get_products() {
  $.ajax({
    type: 'GET',
    url: '/products',
    data: {},
    success: function (response) {
      for (let e of response.data) {
        let id = e.productId;
        let name = e.productName;
        let spec = e.productExp;
        let price = e.price;
        let photo = e.productPhoto;
        let quantity = e.quantity;
        let count = e.userCount;
        let created = e.createdAt;
        let updated = e.updatedAt;
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

function search() {}
