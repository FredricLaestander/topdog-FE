import "./style.css";
import { header } from "./header";

header();

const name = document.querySelector<HTMLInputElement>("#name")!;
const description = document.querySelector<HTMLInputElement>("#description")!;
const errorSpan = document.querySelector<HTMLSpanElement>("#error")!;
const createListForm = document.getElementById("createList")!;

const url = `${import.meta.env.VITE_BACKEND_URL}/lists`;

function main() {
  const accessToken = localStorage.getItem("access-token");

  if (!accessToken) {
    window.location.pathname = "/log-in";
    return;
  }

  createListForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const values = {
        name: name.value,
        description: description.value,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errorMessage ||
            "Dear dog, you have an unexpected error. Please try refreshing the site. Love -The team"
        );
      }

      window.location.assign(`/list?id=${data.listId}`);
    } catch (error) {
      if (error instanceof Error) {
        errorSpan.innerText = error.message;
      }
    }
  });
}

main();
