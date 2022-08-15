import { login, logout, signup } from "/login.js";

const loginForm = document.querySelector("#form-login");
const logoutBtn = document.querySelector(".logout-btn");
const signupForm = document.querySelector("#form-signup");

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

if (signupForm)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#f-name").value;
    const lastName = document.querySelector("#l-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const passwordConfirm = document.querySelector("#passwordConfirm").value;

    signup(firstName, lastName, email, password, passwordConfirm);
  });
