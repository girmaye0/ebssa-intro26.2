// Populate skills section
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

//Fetch GitHub repositories
fetch("https://api.github.com/users/girmaye0/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })

  .then((repositories) => {
    console.log("Fetched repositories:", repositories);
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    console.error("Error loading repositories:", error.message);
    const projectSection = document.getElementById("projects");
    if (projectSection) {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = `Sorry! Couldn't load projects at this time: ${error.message}`;
      errorMessage.style.color = "red";
      errorMessage.style.fontWeight = "bold";
      projectSection.appendChild(errorMessage);
    }
  });
