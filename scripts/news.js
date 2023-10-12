"use strict";

//6. Hiển thị các bài viết
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

const apiKey = "282a6192e6794cfc914d8a8de8aac084";
let totalResults = 0; //biến để tính số news API trả về tối đa
let pageSize = getFromStorage("pageSize");
let category = getFromStorage("category");

//Hàm hiển thị list News trên trang
function displayNewList(data) {
  totalResults = data.totalResults;

  let html = "";
  data.articles.forEach((article) => {
    html += `
    <div class="new-content" >
      <div class="img-banner" >
        <img src=${article.urlToImage ?? "no-image.png"} alt="No image"/>
      </div>
      <div class="content">
        <h4>${article.title}</h4>
        <p>${article.description}</p>
        <button class="btn-view"><a href="${
          article.url
        }" target="blank">View</a></button>
      </div>
    </div> `;
  });
  newsContainer.innerHTML = html;

  checkBtnPrev();
  checkBtnNext();
}

//Hàm lấy data từ API và hiển thị ra list tin tức
async function getDataNews(country, page) {
  try {
    //kết nối api và lấy dữ liệu
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
    );
    const data = await res.json();
    displayNewList(data); //hiển thị dữ liệu
  } catch (err) {
    alert("Error:" + err.message);//báo lỗi nếu có
  }
}
getDataNews("us", 1);

//7. Chuyển trang cho các bài viết
//Hàm kiểm tra điều kiện ấn nút Previous, Next
function checkBtnPrev() {
  if (pageNum.textContent <= "1") {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}
function checkBtnNext() {
  if (pageNum.textContent >= Math.ceil(totalResults / pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

//Bắt sự kiện vào nút Previous, Next
btnPrev.addEventListener("click", function () {
  getDataNews("us", --pageNum.textContent);
});

btnNext.addEventListener("click", function () {
  getDataNews("us", ++pageNum.textContent);
});
