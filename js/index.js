import { login, logout, signup } from "/auth.js";
import { bookmark } from "/operations";

const loginForm = document.querySelector("#form-login");
const logoutBtn = document.querySelector(".logout-btn");
const signupForm = document.querySelector("#form-signup");

const bookmarkBtns = document.querySelectorAll(".bookmark-btn");
const likeBtns = document.querySelectorAll(".like-btn");

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

    firstName = lastName = email = password = passwordConfirm = "";
  });

if (bookmarkBtns) {
  bookmarkBtns.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      console.log(`Clicked on: ${el.dataset.id}`);

      const bID = document.querySelectorAll("#bookmarkSVG")[index];

      const fill = bID.getAttribute("fill");
      console.log(fill);

      if (fill === "none") {
        bID.setAttribute("fill", "#FFF");
      } else {
        bID.setAttribute("fill", "none");
      }

      bookmark(el.dataset.id, "bookmark");
    });
  });
}

if (likeBtns) {
  likeBtns.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      console.log(`Clicked on: ${el.dataset.id}`);

      const bID = document.querySelectorAll("#likedSVG")[index];

      const fill = bID.getAttribute("fill");
      console.log(fill);

      if (fill === "none") {
        bID.setAttribute("fill", "#ffc0cb");
      } else {
        bID.setAttribute("fill", "none");
      }

      bookmark(el.dataset.id, "like");
    });
  });
}
