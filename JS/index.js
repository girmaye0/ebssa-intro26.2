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
for (let i = 0; i < skills.length; i++) {
  const skillItem = document.createElement("li");
  skillItem.textContent = skills[i];
  skillsList.appendChild(skillItem);
}
//Form handling
const messageForm = document.getElementsByName("leave_message")[0];
messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  function toggleMessageSection() {
    if (messageList.children.length === 0) {
      messageSection.classList.add("hidden");
    } else {
      messageSection.classList.remove("hidden");
    }
  }
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `
    <a href="mailto:${email}">${name}</a>
    <span>: ${message}</span>
  `;

  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.type = "button";
  editButton.innerText = "Edit";
  editButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
    toggleMessageSection();
  });

  editButton.addEventListener("click", function () {
    const entry = editButton.parentNode;
    const messageSpan = entry.querySelector("span");

    if (editButton.innerText === "Edit") {
      const currentMessage = messageSpan.textContent.replace(/^:\s*/, "");
      const editArea = document.createElement("textarea");
      editArea.value = currentMessage;
      editArea.className = "inline-edit-box";
      messageSpan.textContent = ": ";
      messageSpan.appendChild(editArea);
      editButton.innerText = "Save";
    } else {
      const editArea = messageSpan.querySelector("textarea");
      const updatedMessage = editArea.value;
      messageSpan.textContent = `: ${updatedMessage}`;
      editButton.innerText = "Edit";
    }
  });
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  messageList.appendChild(newMessage);
  toggleMessageSection();
  messageForm.reset();
});
