"use strict";

const inputQuery = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");

const navPageNum = document.getElementById("nav-page-num");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

const newsContainer = document.getElementById("news-container");

let pageSize = getFromStorage("pageSize");
let totalResults = 0;
let keywords = "";
navPageNum.style.display = "none"; //mặc định không hiển thị nút chuyển trang

//Hàm xử lí sự kiện khi click nút Search
btnSearch.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";
  //kiểm tra người dùng nhập keyword chưa
  if (inputQuery.value.trim() === "") {
    navPageNum.style.display = "none";
    alert("Vui lòng nhập keywords để tìm kiếm!");
  } else {
    keywords = inputQuery.value;
    getDataNewsByKeyWords(keywords, 1);
  }
});

// Hàm xử lí nhận dữ liệu từ API
async function getDataNewsByKeyWords(keywords, page) {
  try {
    const res =
      await fetch(`https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${pageSize}&page=${page}&apiKey=282a6192e6794cfc914d8a8de8aac084
    `);
    const data = await res.json();
    if (data.totalResults === 0) {
      //trường hợp không có kết quả trả về
      navPageNum.style.display = "none";
      throw new Error(
        "Không có bài báo phù hợp với từ khóa, vui lòng thử từ khóa khác"
      );
    }
    navPageNum.style.display = "block"; //hiển thị các nút chuyển trang khi có kết quả trả về
    displayNewList(data);
  } catch (err) {
    alert(err.message);
  }
}

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

//Chuyển trang cho các bài viết
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
  getDataNewsByKeyWords(keywords, --pageNum.textContent);
});

btnNext.addEventListener("click", function () {
  getDataNewsByKeyWords(keywords, ++pageNum.textContent);
});
