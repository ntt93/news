"use strict";

if (currentUser) {
  //nếu người dùng đã đăng nhập
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");

  //Sự kiện nhấn nút Add
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim() === "") {
      alert("Vui lòng nhập nhiệm vụ!");
    } else {
      const todo = new Task(inputTask.value, currentUser.username, false);
      //thêm task mới vào danh sách hiển thị
      todoArr.push(todo);
      //lưu vào Storage
      saveToStorage("todoArr", todoArr);
      //hiển thị lại Todo List
      displayTodoList();
      //reset dữ liệu trong form nhập
      inputTask.value = "";
    }
  });

  //Hàm hiển thị Todo List
  function displayTodoList() {
    let html = "";
    //lọc ra todoList của user đang đăng nhập
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">x</span></li>`;
      });
    todoList.innerHTML = html;

    //bắt các sự kiện
    eventToggleTask(); //đánh dấu sự kiện hoàn thành
    eventDeleteTask(); //xóa task
  }
  displayTodoList();

  //Hàm bắt sự kiện toggle
  function eventToggleTask() {
    //lấy tất cả phần tử li và bắt sự kiện
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        //tránh nút delete
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          //tìm task vừa được click vào toggle
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1) //lấy nội dung text của task, loại bỏ dấu x
          );
          //sau đó thay đổi thuộc tính isDone của nó
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  //Hàm delete
  function eventDeleteTask() {
    //lấy tất cả phần tử li và bắt sự kiện
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        if (confirm("Bạn muốn xóa?")) {
          const index = todoArr.findIndex(
            (Item) =>
              Item.owner === currentUser.username &&
              Item.task === closeEl.parentElement.textContent.slice(0, -1) //lấy nội dung text của task, loại bỏ dấu x
          );
          //xóa task ra khỏi todoArr
          todoArr.splice(index, 1);
          saveToStorage("todoArr", todoArr);
          displayTodoList();
        }
      });
    });
  }
} else {
  //nếu người dùng chưa đăng nhập
  alert("Vui lòng đăng nhập để truy cập chức năng này!");
  window.location.href = "../index.html";
}
