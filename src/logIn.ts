import "./style.css";
import { header } from "./header";

header();

const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

const email = document.querySelector<HTMLInputElement>("#email")!;
const emailError = document.querySelector<HTMLSpanElement>("#email-error")!;

const password = document.querySelector<HTMLInputElement>("#password")!;
const passwordError =
  document.querySelector<HTMLSpanElement>("#password-error")!;

const error = document.querySelector<HTMLSpanElement>("#error")!;

const logInForm = document.getElementById("log-in")!;

logInForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const values = {
    email: email.value,
    password: password.value,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = await response.json();

  if (!response.ok) {
    if (data.email) {
      emailError.innerText = data.email._errors[0];
    }

    if (data.password) {
      passwordError.innerText = data.password._errors[0];
    }

    if (data.errorMessage) {
      error.innerText = data.errorMessage;
    }

    return;
  }

  localStorage.setItem("access-token", data.accessToken);
  window.location.pathname = "/";
});
