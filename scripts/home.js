"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

//4. Home Page
function displayHome() {
  if (currentUser) {
    //hiển thị khi người dùng đã Login
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`; //thêm thông báo welcome message
  } else {
    //hiển thị khi người dùng chưa Login
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
displayHome();

//5. Chức năng Logout
btnLogout.addEventListener("click", function () {
  if (confirm("Bạn muốn Logout chứ?")) {
    localStorage.removeItem("currentUser"); //xóa currentUser ra khỏi localStorage
    window.location.href = "../pages/login.html";
  }
});
