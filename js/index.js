import { login, logout } from "/login.js";

const loginForm = document.querySelector("#form");
const logoutBtn = document.querySelector(".logout-btn");

if (loginForm)
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login(email, password);

    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
  });

if (logoutBtn) logoutBtn.addEventListener("click", logout);
