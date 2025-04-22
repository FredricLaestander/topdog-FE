import "./style.css";
import { header } from "./header";
import { icons } from "./icons";
import { List } from "./types";

header();
icons();

const editNameInput = document.querySelector<HTMLInputElement>("#name")!;
const editDescriptionInput =
  document.querySelector<HTMLInputElement>("#description")!;

async function getListById() {
  const params = new URLSearchParams(window.location.search);
  const listId = params.get("id");
  const url = `${import.meta.env.VITE_BACKEND_URL}/lists/${listId}`;

  const tiers = document.querySelector("#tiers")!;

  try {
    const response = await fetch(url);

    const list = (await response.json()) as List;

    const h2 = document.getElementById("listTitle")!;
    h2.innerText = list.name;

    if (list.description) {
      const description = document.getElementById("description")!;
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
    editDescriptionInput.value = list.description;
  } catch (error) {}
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
tierListSettings.addEventListener("submit", (event) => {
  event.preventDefault();
  toggleSettings();
});

function editList(
  
) {}

getListById();
