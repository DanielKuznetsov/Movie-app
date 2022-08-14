// console.log("hi22222222");
import { login } from "/login.js";

const loginForm = document.querySelector("#form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login(email, password);
  });
}
