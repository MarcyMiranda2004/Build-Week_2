const getArtist = function (artistID) {
  const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
  fetch(artistURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) =>
      response.ok ? response.json() : Promise.reject("La risposta non è valida")
    )
    .then((data) => {
      console.log("DATA:", data);
      document.getElementById("artist-bg").style.cssText = `
        background-image: url('${data.picture_xl}');
        background-size: cover;
        background-position: center;
        height: 300px;
        width: 100%;
      `;
      document.getElementById("artist-name").innerText = data.name;
      document.getElementById(
        "artist-listeners"
      ).innerText = `${data.nb_fan.toLocaleString()} ascoltatori mensili`;
      const roundedArtist = document.getElementById("roundedArtist");
      roundedArtist.src = `${data.picture_xl}`;
      roundedArtist.style.width = "40px";
    })
    .catch((err) => console.log("ERROR:", err));
};

const getPopularTracks = function (artistID) {
  const tracksURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top?limit=5`;

  fetch(tracksURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject("Errore nel recupero dei brani")
    )
    .then((data) => {
      const popularTracksList = document.getElementById("popular-tracks-list");
      popularTracksList.innerHTML = ""; // Pulisce prima di riempire

      data.data.forEach((track) => {
        const listItem = document.createElement("li");
        listItem.classList.add("mb-3");
        listItem.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <div class="image-container">
          <img  id="playbarCloseAppSongImg" src="${
            track.album.cover_small
          }" alt="img brano" class="rounded track-img" />
          <div class="play-button">
            <i class="bi bi-play-fill"></i>
          </div>
        </div>
        <div class="flex-grow-1">
          <h5 id="playbarCloseAppSongTitle" class="mb-1" >${track.title}</h5>
          <div class="d-flex justify-content-md-between justify-content-sm-start gap-4">
            <p class="mb-0 text-secondary">Ascolti: ${track.rank.toLocaleString()}</p>
            <p class="mb-0 text-secondary">${formatDuration(track.duration)}</p>
          </div>
        </div>
      </div>
    `;
        popularTracksList.appendChild(listItem);
      });
    })
    .catch((err) => console.error("ERROR:", err));
};

const updatePlaybarSong = (track) => {
  const playbarSongTitle = document.getElementById("playbarCloseAppSongTitle");
  const playbarSongArtist = document.getElementById(
    "playbarCloseAppSongArtist"
  );
  const playbarSongImg = document.getElementById("playbarCloseAppSongImg");

  // Verifica che gli ID corrispondano agli elementi della tua playbar
  if (playbarSongTitle && playbarSongArtist && playbarSongImg) {
    playbarSongTitle.innerText = track.title;
    playbarSongArtist.innerText = track.artist
      ? track.artist.name
      : "Sconosciuto"; // Verifica se c'è il nome dell'artista
    playbarSongImg.src = track.album.cover_big
      ? track.album.cover_big
      : "default-image-url.jpg"; // Immagine di fallback
  } else {
    console.error("Gli ID degli elementi della playbar non sono corretti.");
  }
};

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
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject("Errore nel recupero dei brani extra")
    )
    .then((data) => {
      const extraTracksList = document.getElementById("extra-tracks-list");
      extraTracksList.innerHTML = ""; // Pulisce la lista
      data.data.slice(5).forEach((track) => {
        const listItem = document.createElement("li");
        listItem.classList.add("mb-3");
        listItem.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <div class="image-container">
            <img  id="playbarCloseAppSongImg" src="${
              track.album.cover_small
            }" alt="img brano" class="rounded track-img" />
            <div class="play-button">
              <i class="bi bi-play-fill"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <h5 id="playbarCloseAppSongTitle" class="mb-1" >${track.title}</h5>
            <div class="d-flex justify-content-md-between justify-content-sm-start gap-4">
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

// Formatta la durata mm:ss
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Visualizza/Nasconde extra tracks
let extraVisible = false;
let extraTracksLoaded = false;
const toggleExtraTracks = (artistID) => {
  const extraTracksContainer = document.getElementById(
    "extra-tracks-container"
  );
  const btn = document.getElementById("visualizzaAltroBtn");

  if (!extraVisible) {
    if (!extraTracksLoaded) {
      getExtraTracks(artistID).then(() => {
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
};
// Prendo l'artistID dai parametri dell'URL
const params = new URLSearchParams(window.location.search);
const artistID = params.get("id");

// Se non c'è l'id nell'URL, avviso l'utente
if (!artistID) {
  alert("Nessun artista selezionato");
} else {
  getArtist(artistID);
  getPopularTracks(artistID);

  document
    .getElementById("visualizzaAltroBtn")
    .addEventListener("click", () => {
      toggleExtraTracks(artistID);
    });
}
