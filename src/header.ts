export async function header() {
  const response = await fetch("header.html");
  const data = await response.text();

  const header = document.querySelector("#header")!;
  header.className = "w-full";
  header.innerHTML = data;
}
