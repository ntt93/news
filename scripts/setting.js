"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSetting = document.getElementById("btn-submit");

//Hàm validate khi nhập dư liệu
function validate() {
  if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
    alert("News per page không hợp lệ!");
    return false;
  }

  if (inputCategory.value === "") {
    alert("Vui lòng nhập News Category!");
    return false;
  }
  return true;
}

//Xử lí sự kiện click vào nút Setting
btnSetting.addEventListener("click", function () {
  if (validate()) {
    const pageSize = Number.parseInt(inputPageSize.value);
    const category = inputCategory.value;

    saveToStorage("pageSize", pageSize);
    saveToStorage("category", category);

    alert("Cài đặt thành công!");
    window.location.href = "news.html";
  }
});
