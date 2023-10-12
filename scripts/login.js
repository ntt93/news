"use strict";

//3. Chức năng Login
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

//Hàm validate trước khi login
function validate() {
  if (inputUsername.value === "") {
    alert("Vui lòng nhập Username");
    return false;
  }

  if (inputPassword.value === "") {
    alert("Vui lòng nhập mật khẩu");
    return false;
  }
  return true;
}

// Hàm để xử lý sự kiện click vào nút Login
btnLogin.addEventListener("click", function () {
  if (validate()) {
    //kiểm tra thông tin đăng nhập có đúng không
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    //thông báo đăng nhập thành công hay chưa
    if (user) {
      alert("Đăng nhập thành công!");
      //lưu thông tin đăng nhập
      saveToStorage("currentUser", user);
      //điều hướng sang trang chủ
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập chưa đúng, vui lòng kiểm tra lại!");
    }
  }
});
