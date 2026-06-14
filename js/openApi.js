const breedSelect = document.getElementById("breed-select");
const dogCard = document.getElementById("dog-card");
const dogImage = document.getElementById("dog-image");
const dogName = document.getElementById("dog-name");
const dogPurpose = document.getElementById("dog-purpose");
const dogTemperament = document.getElementById("dog-temperament");
const errorMessage = document.getElementById("error-message");
const imageLoading = document.getElementById("image-loading");

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
      breedSelect.innerHTML = '<option value="">-- Select a Breed --</option>';

      breedsData.forEach((breed) => {
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

  dogCard.classList.remove("hidden"); //
  imageLoading.classList.remove("hidden");
  dogImage.classList.add("hidden");

  fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch breed metadata. Status: ${response.status}`,
        );
      }
      return response.json();
    })
    .then((selectedBreed) => {
      let imageId = "";
      if (selectedBreed.reference_image_id) {
        imageId = selectedBreed.reference_image_id;
      } else if (selectedBreed.image && selectedBreed.image.id) {
        imageId = selectedBreed.image.id;
      }

      let imageFetchUrl = `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=1`;
      if (imageId) {
        imageFetchUrl = `https://api.thedogapi.com/v1/images/${imageId}`;
      }

      return fetch(imageFetchUrl, requestOptions).then((imgResponse) => {
        if (!imgResponse.ok) {
          throw new Error(
            `Image resource request failed with status: ${imgResponse.status}`,
          );
        }
        return imgResponse.json().then((imageData) => {
          const structuralImgData = Array.isArray(imageData)
            ? imageData[0]
            : imageData;

          return {
            breedInfo: selectedBreed,
            imageInfo: structuralImgData,
          };
        });
      });
    })
    .then(({ breedInfo, imageInfo }) => {
      if (!imageInfo || !imageInfo.url) {
        throw new Error(
          "The API did not return an image URL path for this selection.",
        );
      }

      imageLoading.classList.add("hidden");
      dogImage.classList.remove("hidden");

      dogImage.src = imageInfo.url;
      dogImage.alt = breedInfo.name;
      dogName.innerText = breedInfo.name;
      dogPurpose.innerText =
        breedInfo.bred_for || "Companion / Working Family Pet";
      dogTemperament.innerText = breedInfo.temperament || "Friendly, Active";
    })
    .catch((error) => {
      imageLoading.classList.add("hidden");
      showError(`Could not render dog profile data. ${error.message}`);
    });
}

breedSelect.addEventListener("change", (event) => {
  displaySelectedBreedDetails(event.target.value);
});

loadBreedDropdown();
