import { header } from "./header";
import "./style.css";

header();

const colorPreset = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-cyan-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
];

async function getLists() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/lists`;
  const featured = document.querySelector("#featured")!;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Something went wrong when trying to fetch data from api: ${response.status}`
      );
    }

    const lists = await response.json();

    // TODO: implement zod to avoid any
    lists.forEach((list: any) => {
      const a = document.createElement("a");
      a.href = `/lists/${list._id}`;

      const h3 = document.createElement("h3");
      h3.innerText = list.name;

      const li = document.createElement("li");

      const div = document.createElement("div");
      const color = colorPreset[Math.floor(Math.random() * colorPreset.length)];
      div.className = `size-32 md:size-44 ${color}`;

      a.append(div);
      a.append(h3);
      li.append(a);
      featured.append(li);
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      const h2 = document.createElement("h2");
      h2.innerText = error.message;
      h2.className = "text-red-500 text-center py-6";
      featured.append(h2);
    }
  }
}

getLists();
