document.addEventListener("DOMContentLoaded", () => {
  const bodyElement = document.querySelector("body");
  const footerElement = document.createElement("footer");
  footerElement.id = "footer";
  bodyElement.appendChild(footerElement);

  const today = new Date();
  const thisYear = today.getFullYear();
  const footer = document.querySelector("footer");
  const copyright = document.createElement("p");
  copyright.innerHTML = `Copyright &copy; ${thisYear}  Girma Ebssa!`;
  footer.appendChild(copyright);
});
