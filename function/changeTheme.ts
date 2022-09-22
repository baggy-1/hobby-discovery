const changeTheme = () => {
  document.querySelector("html")?.classList.toggle("dark");
  if (document.querySelector("html")?.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

export default changeTheme;
