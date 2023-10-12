"use strict";

//2. Chức năng Register
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

// Tạo một hàm validate để kiểm tra tính hợp lệ của thông tin đăng ký.
function validate(user) {
  //firstname, lastname, username, password, confirmPassword
  if (user.firstName.trim() === "") {
    alert("Vui lòng nhập First Name");
    return false;
  }

  if (user.lastName.trim() === "") {
    alert("Vui lòng nhập Last Name");
    return false;
  }

  if (user.username.trim() === "") {
    alert("Vui lòng nhập Username");
    return false;
  }

  if (user.password === "") {
    alert("Vui lòng nhập mật khẩu");
    return false;
  }

  if (inputPasswordConfirm.value === "") {
    alert("Vui lòng xác nhận mật khẩu");
    return false;
  }

  // Check thêm điều kiện password
  if (user.password !== inputPasswordConfirm.value) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp");
    return false;
  }

  if (user.password.length <= 8) {
    alert("Mật khẩu phải lớn hơn 8 kí tự");
    return false;
  }
  //username không trùng nhau
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      alert("Username đã tồn tại!");
      return false;
    }
  }
  // Validation passed
  return true;
}
// Tạo hàm để xử lý sự kiện click vào nút Register.
btnRegister.addEventListener("click", function () {
  //lấy dữ liệu nhập vào từ người dùng
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );

  //validate dữ liệu
  if (validate(user)) {
    //thêm user vào mảng
    userArr.push(user);
    //lưu dữ liệu vào Storage
    saveToStorage("userArr", userArr);
    alert("Đăng kí thành công!");
    //điều hướng sang trang Login
    window.location.href = "../pages/login.html";
  }
});
