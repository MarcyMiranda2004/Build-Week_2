const getArtist = function (artistID) {
  const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
  fetch(artistURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta non è valida");
      }
    })
    .then((data) => {
      console.log("DATA:", data);
      const artistBg = document.getElementById("artist-bg");
      artistBg.style.backgroundImage = `url('${data.picture_xl}')`;
      artistBg.style.backgroundSize = "cover";
      artistBg.style.backgroundPosition = "center";
      artistBg.style.height = "300px"; // Puoi regolarlo come vuoi
      artistBg.style.width = "100%";
      const artistName = document.getElementById("artist-name");
      artistName.innerText = data.name;
      const artistListeners = document.getElementById("artist-listeners");
      artistListeners.innerText = `${data.nb_fan.toLocaleString()} ascoltatori mensili`;
      const roundedArtist = document.getElementById("roundedArtist");
      roundedArtist.src = `${data.picture_xl}`;
      roundedArtist.style.width = "40px";
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};
getArtist(4050205);

const getPopularTracks = function (artistID) {
  const tracksURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top?limit=5`; // Otteniamo i 5 brani più popolari

  fetch(tracksURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei brani");
      }
    })
    .then((data) => {
      const popularTracksList = document.getElementById("popular-tracks-list");

      data.data.forEach((track) => {
        const listItem = document.createElement("li");

        listItem.classList.add("mb-3");

        listItem.innerHTML = `
            <div class="d-flex align-items-center gap-3 ">
              <img
                src="${track.album.cover_small}"
                alt="img brano"
                class="rounded"
                style="width: 60px; height: 60px; object-fit: cover"
              />
  
              <div class="flex-grow-1">
                <h5 class="mb-1">${track.title}</h5>
                <div class="d-flex justify-content-md-between justify-content-sm-start gap-4 gap-sm-4 gap-md-3 ">
                  <p class="mb-0 text-secondary">Ascolti: ${track.rank.toLocaleString()}</p>
                  <p class="mb-0 text-secondary">${formatDuration(
                    track.duration
                  )}</p>
                </div>
              </div>
            </div>
          `;

        popularTracksList.appendChild(listItem);
      });
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};

// Funzione per formattare la durata del brano in minuti:secondi
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

getPopularTracks(4050205);

const getExtraTracks = function (artistID) {
  return fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top?limit=10`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
      },
    }
  )
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Errore nel recupero dei brani extra");
    })
    .then((data) => {
      const extraTracksList = document.getElementById("extra-tracks-list");
      extraTracksList.innerHTML = "";
      // ATTENTO! Non fare innerHTML = "" ad ogni click
      data.data.slice(5).forEach((track) => {
        const listItem = document.createElement("li");
        listItem.classList.add("mb-3");
        listItem.innerHTML = `
            <div class="d-flex align-items-center gap-3">
              <img src="${track.album.cover_small}" 
                   alt="cover" 
                   class="rounded" 
                   style="width: 60px; height: 60px; object-fit: cover;" />
              <div class="flex-grow-1">
                <h5 class="mb-1">${track.title}</h5>
                <div class="d-flex justify-content-md-between justify-content-sm-start gap-4 gap-sm-4 gap-md-3 ">
                  <p class="mb-0 text-secondary">Ascolti: ${track.rank.toLocaleString()}</p>
                  <p class="mb-0 text-secondary">${formatDuration(
                    track.duration
                  )}</p>
                </div>
              </div>
            </div>
          `;
        extraTracksList.appendChild(listItem);
      });
    })
    .catch((err) => console.error("ERROR:", err));
};

document.getElementById("visualizzaAltroBtn").addEventListener("click", () => {
  getExtraTracks(4050205);
});
let extraVisible = false;
let extraTracksLoaded = false;

document.getElementById("visualizzaAltroBtn").addEventListener("click", () => {
  const extraTracksContainer = document.getElementById(
    "extra-tracks-container"
  );
  const btn = document.getElementById("visualizzaAltroBtn");

  if (!extraVisible) {
    if (!extraTracksLoaded) {
      getExtraTracks(4050205).then(() => {
        extraTracksContainer.style.display = "block";
        btn.textContent = "Nascondi";
        extraVisible = true;
        extraTracksLoaded = true;
      });
    } else {
      extraTracksContainer.style.display = "block";
      btn.textContent = "Nascondi";
      extraVisible = true;
    }
  } else {
    extraTracksContainer.style.display = "none";
    btn.textContent = "Visualizza Altro";
    extraVisible = false;
  }
});
