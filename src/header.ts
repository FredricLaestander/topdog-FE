export async function header() {
  const header = document.querySelector("#header")!;
  header.className = "flex p-4 justify-between fixed bg-white w-full";

  const logoLink = document.createElement("a");
  logoLink.href = "/";

  const logo = document.createElement("img");
  logo.src = "/logo.svg";
  logo.alt = "Logo";

  logoLink.append(logo);

  const nav = document.createElement("nav");
  nav.className = "px-4 flex md:gap-8 items-center";

  const desktopNav = document.createElement("div");
  desktopNav.className = "hidden text-zinc-700 md:flex md:gap-8";

  const homeLink = document.createElement("a");
  homeLink.innerText = "Home";
  homeLink.href = "/";
  homeLink.className = "link";

  const createListLink = document.createElement("a");
  createListLink.innerText = "Create tier list";
  createListLink.href = "/create-list";
  createListLink.className = "link";

  desktopNav.append(homeLink, createListLink);

  const logInLink = document.createElement("a");
  logInLink.innerText = "Log in";
  logInLink.href = "/log-in";
  logInLink.className = "button";

  nav.append(desktopNav, logInLink);

  header.append(logoLink, nav);
}
