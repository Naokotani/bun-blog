const bulb = document.getElementById("bulb");
const moon = document.getElementById("moon");

if (localStorage.getItem("pref-theme") === "dark") {
  document.body.classList.add("dark");
  bulb.style.display = "inline";
} else if (localStorage.getItem("pref-theme") === "light") {
  document.body.classList.add("light");
  moon.style.display = "inline";
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark");
  bulb.style.display = "inline";
} else {
  document.body.classList.add("light");
  moon.style.display = "inline";
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  if (document.body.className.includes("dark")) {
    moon.style.display = "inline";
    bulb.style.display = "none";
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("pref-theme", "light");
  } else {
    bulb.style.display = "inline";
    moon.style.display = "none";
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("pref-theme", "dark");
  }
});
