"use strict";
//1. Tạo Class User
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

//Tạo Class Task để chưá các thông tin trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
