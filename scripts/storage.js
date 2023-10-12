"use strict";

//hàm lưu dữ liệu chung
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//hàm lấy dữ liệu chung
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//========================
//Register
//hàm lấy dữ liệu userArr từ local Storage
const users = getFromStorage("userArr") ?? [];
//chuyển useArr sang class Instance
const userArr = users.map((user) => parseUser(user));
//hàm chuyển từ JS Object sang class Instance cho User
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  return user;
}

//========================
//Login
//hàm lấy dữ liệu currentArr từ local Storage
let currentUser = getFromStorage("currentUser") ?? null;

//========================
//Todo List
//hàm lấy dữ liệu todoArr từ local Storage
const todos = getFromStorage("todoArr") ?? [];
//chuyển todoArr sang class Instance
const todoArr = todos.map((todo) => parseTask(todo));
//hàm chuyển từ JS Object sang class Instance cho Task
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
