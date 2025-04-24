import "./style.css";
import { header } from "./header";
import { icons } from "./icons";
import { List } from "./types";

header();
icons();

const editNameInput = document.querySelector<HTMLInputElement>("#name-input")!;
const editDescriptionInput =
  document.querySelector<HTMLInputElement>("#description-input")!;
const errorStatus = document.querySelector<HTMLSpanElement>("#error")!;

const params = new URLSearchParams(window.location.search);
const listId = params.get("id");
const url = `${import.meta.env.VITE_BACKEND_URL}/lists/${listId}`;

const h2 = document.getElementById("listTitle")!;
const description = document.getElementById("description")!;

async function getListById() {
  const tiers = document.querySelector("#tiers")!;

  try {
    const response = await fetch(url);

    const list = (await response.json()) as List | { errorMessage: string };

    if ("errorMessage" in list) {
      throw Error(list.errorMessage);
    }

    h2.innerText = list.name;

    if (list.description) {
      description.innerText = list.description;
    }

    const username = document.getElementById("username")!;
    username.innerText = `@${list.user.username}`;

    list.tiers.forEach((tier) => {
      const li = document.createElement("li");
      li.className = "h-20 md:h-28 flex";

      const tierBox = document.createElement("div");
      tierBox.className =
        "size-20 md:size-28 flex shrink-0 items-center justify-center";
      tierBox.style.backgroundColor = tier.color;

      const p = document.createElement("p");
      p.className = "text-center break-words min-w-0 line-clamp-4";
      p.innerText = tier.name;

      const imageContainer = document.createElement("div");
      imageContainer.className = "flex flex-wrap size-full border-y border-r-2";
      imageContainer.style.borderColor = tier.color;

      tierBox.append(p);
      li.append(tierBox);
      li.append(imageContainer);

      tiers.append(li);
    });

    editNameInput.value = list.name;
    editDescriptionInput.value = list.description ? list.description : "";
  } catch (error) {
    if (error instanceof Error) {
      errorStatus.innerText = error.message;
    }
  }
}

function toggleSettings() {
  const settingsModal = document.querySelector<HTMLDivElement>(
    "#tier-list-settings-modal"
  )!;

  if (settingsModal.classList.contains("hidden")) {
    settingsModal.classList.remove("hidden");
    settingsModal.classList.add("flex");
  } else {
    settingsModal.classList.remove("flex");
    settingsModal.classList.add("hidden");
  }
}

const openSettings =
  document.querySelector<HTMLButtonElement>("#open-settings")!;
openSettings.addEventListener("click", toggleSettings);

const tierListSettings = document.querySelector<HTMLFormElement>(
  "#tier-list-settings"
)!;

const accessToken = localStorage.getItem("access-token");
if (accessToken) {
  openSettings.classList.remove("hidden");
}

const editList = async () => {
  try {
    if (!accessToken) {
      alert("You cannot update someone elses list.");
      return;
    }

    const values = {
      name: editNameInput.value,
      description: editDescriptionInput.value,
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(values),
    });

    const list = (await response.json()) as List | { errorMessage: string };

    if ("errorMessage" in list) {
      throw new Error(list.errorMessage);
    }

    console.log(list);
    h2.innerText = list.name;

    if (!list.description || list.description === "") {
      description.innerText = "";
    } else {
      description.innerText = list.description;
    }
  } catch (error) {
    if (error instanceof Error) {
      errorStatus.innerText = error.message;
    }
  }
};

tierListSettings.addEventListener("submit", (event) => {
  event.preventDefault();
  editList();
  toggleSettings();
});

getListById();

const deleteList = async () => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = (await response.json()) as { errorMessage: string } | string;

    if (typeof data === "object" && "errorMessage" in data) {
      throw new Error(data.errorMessage);
    }

    window.location.href = "/";
  } catch (error) {
    if (error instanceof Error) {
      errorStatus.innerText = error.message;
    }
  }
};

const deleteListButton = document.querySelector<HTMLButtonElement>("#delete")!;

deleteListButton.addEventListener("click", () => {
  deleteList();
  toggleSettings();
});
