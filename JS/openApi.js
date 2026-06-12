const breedSelect = document.getElementById("breed-select");
const dogCard = document.getElementById("dog-card");
const dogImage = document.getElementById("dog-image");
const dogName = document.getElementById("dog-name");
const dogPurpose = document.getElementById("dog-purpose");
const dogTemperament = document.getElementById("dog-temperament");
const errorMessage = document.getElementById("error-message");

const openDogApiKey = secretDogApiKey;
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": openDogApiKey,
});

const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
//console.log("My API Key is currently loading as:", openDogApiKey);
//console.log("Key check:", openDogApiKey);

let cachedBreeds = [];

function showError(msg) {
  errorMessage.innerText = `Error: ${msg}`;
  errorMessage.classList.remove("hidden");
  dogCard.classList.add("hidden");
}

function clearError() {
  errorMessage.innerText = "";
  errorMessage.classList.add("hidden");
}

function loadBreedDropdown() {
  clearError();

  fetch("https://api.thedogapi.com/v1/breeds", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((breedsData) => {
      cachedBreeds = breedsData;

      breedSelect.innerHTML = '<option value="">-- Select a Breed --</option>';

      cachedBreeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.innerText = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch((error) => {
      showError(`Failed to load breed dropdown list. ${error.message}`);
    });
}

function displaySelectedBreedDetails(breedId) {
  clearError();

  if (!breedId) {
    dogCard.classList.add("hidden");
    return;
  }

  const selectedBreed = cachedBreeds.find((b) => b.id == breedId);

  if (!selectedBreed) {
    showError("Breed details not found.");
    return;
  }

  let imageId = "";
  if (selectedBreed.image && selectedBreed.image.id) {
    imageId = selectedBreed.image.id;
  } else if (selectedBreed.reference_image_id) {
    imageId = selectedBreed.reference_image_id;
  }

  let fetchUrl = `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=1`;

  if (imageId) {
    fetchUrl = `https://api.thedogapi.com/v1/images/${imageId}`;
  }

  fetch(fetchUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Image fetch failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const imageData = Array.isArray(data) ? data[0] : data;

      if (!imageData || !imageData.url) {
        throw new Error("The API did not return an image URL for this breed.");
      }

      dogImage.src = imageData.url;
      dogImage.alt = selectedBreed.name;
      dogName.innerText = selectedBreed.name;
      dogPurpose.innerText =
        selectedBreed.bred_for || "Companion / Working Family Pet";
      dogTemperament.innerText =
        selectedBreed.temperament || "Friendly, Active";

      dogCard.classList.remove("hidden");
    })
    .catch((error) => {
      showError(`Could not render dog profile image. ${error.message}`);
    });
}

breedSelect.addEventListener("change", (event) => {
  displaySelectedBreedDetails(event.target.value);
});

loadBreedDropdown();

//footer
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
