const bodyElement = document.querySelector("body");
const footerElement = document.createElement("footer");
footerElement.id = "footer";
bodyElement.appendChild(footerElement);

const today = new Date();
const year = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Copyright &copy; ${year}  Girma Ebssa!`;
footer.appendChild(copyright);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Git",
  "Requirement Gathering",
  "Project Management",
  "Team Lead",
  "Problem Solving",
];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");
skills.forEach((skill) => {
  const skillItem = document.createElement("li");
  skillItem.textContent = skill;
  skillsList.appendChild(skillItem);
});
