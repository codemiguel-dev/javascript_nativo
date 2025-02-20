const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  btn.classList.toggle("btn-bounce");

  setTimeout(() => {
    btn.classList.remove("btn-bounce");
  },500)
});