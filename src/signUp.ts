import "./style.css";

const url = `${import.meta.env.VITE_BACKEND_URL}/auth/signup`;

const username = document.querySelector<HTMLInputElement>("#username")!;
const usernameError =
  document.querySelector<HTMLSpanElement>("#username-error")!;

const email = document.querySelector<HTMLInputElement>("#email")!;
const emailError = document.querySelector<HTMLSpanElement>("#email-error")!;

const password = document.querySelector<HTMLInputElement>("#password")!;
const passwordError =
  document.querySelector<HTMLSpanElement>("#password-error")!;

const passwordConfirmation = document.querySelector<HTMLInputElement>(
  "#password-confirmation"
)!;
const passwordConfirmationError = document.querySelector<HTMLSpanElement>(
  "#password-confirmation-error"
)!;

const error = document.querySelector<HTMLSpanElement>("#error")!;

const signUpForm = document.getElementById("sign-up")!;

signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (password.value !== passwordConfirmation.value) {
    passwordConfirmationError.innerText = "Passwords are not matching";
  }

  const values = {
    username: username.value,
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
    if (data.username) {
      usernameError.innerText = data.username._errors[0];
    }

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

  window.location.pathname = "/";
});
