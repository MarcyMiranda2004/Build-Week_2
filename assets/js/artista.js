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
            <img src="${
              track.album.cover_small
            }" alt="img brano" class="rounded track-img" />
            <div class="play-button">
              <i class="bi bi-play-fill"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <h5 class="mb-1 track-title">${track.title}</h5>
            <div class="d-flex justify-content-md-between justify-content-sm-start gap-4">
              <p class="mb-0 text-white">Ascolti: ${track.rank.toLocaleString()}</p>
              <p class="mb-0 text-white">${formatDuration(track.duration)}</p>
            </div>
          </div>
        </div>
      `;
        popularTracksList.appendChild(listItem);
      });
    })
    .catch((err) => console.error("ERROR:", err));
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
            <img src="${
              track.album.cover_small
            }" alt="img brano" class="rounded track-img" />
            <div class="play-button">
              <i class="bi bi-play-fill"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <h5 class="mb-1 track-title">${track.title}</h5>
            <div class="d-flex justify-content-md-between justify-content-sm-start gap-4">
              <p class="mb-0 text-white">Ascolti: ${track.rank.toLocaleString()}</p>
              <p class="mb-0 text-white">${formatDuration(track.duration)}</p>
            </div>
          </div>
        </div>
      `;
        extraTracksList.appendChild(listItem);
      });
    })
    .catch((err) => console.error("ERROR:", err));
};

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
// Event delegation sui due contenitori delle tracce

document
  .getElementById("popular-tracks-list")
  .addEventListener("click", handleTrackClick);
document
  .getElementById("extra-tracks-list")
  .addEventListener("click", handleTrackClick);

function handleTrackClick(e) {
  // Controllo se clicchi su immagine, titolo o sul bottone play
  if (
    e.target.classList.contains("track-img") ||
    e.target.classList.contains("track-title") ||
    e.target.classList.contains("bi-play-fill")
  ) {
    // Risalgo al li
    const trackElement = e.target.closest("li");
    if (trackElement) {
      const trackTitle = trackElement.querySelector(".track-title").innerText;
      const trackImgSrc = trackElement.querySelector(".track-img").src;
      const artistName = document.getElementById("artist-name").innerText;

      fillPlaybar(trackTitle, artistName, trackImgSrc);
    }
  }
}

const fillPlaybar = (title, artist, imgSrc) => {
  const playbarTitle = document.getElementById("playbarCloseAppSongTitle");
  const playbarArtist = document.getElementById("playbarCloseAppSongArtist");
  const playbarDesktopImg = document.querySelector(".actualSong");

  const playbarMobileImg = document.querySelector(
    "#playbarMobile .playbar-song-img"
  );

  if (playbarTitle) playbarTitle.innerText = title;
  if (playbarArtist) playbarArtist.innerText = artist;
  if (playbarDesktopImg) playbarDesktopImg.src = imgSrc; // Aggiorna l'immagine desktop

  if (playbarMobileImg) playbarMobileImg.src = imgSrc;

  if (playbarTitle) {
    playbarTitle.style.whiteSpace = "nowrap";
    playbarTitle.style.overflow = "hidden";
    playbarTitle.style.textOverflow = "ellipsis";
    playbarTitle.style.maxWidth = "150px";
    playbarTitle.style.display = "inline-block";
  }
};

// Gestione della progress bar dinamica (bonus)
let progress = 0;
const progressBar = document.querySelector(".progress-bar");

const simulateProgress = () => {
  if (progress < 100) {
    progress += 1;
    progressBar.style.width = `${progress}%`;
    setTimeout(simulateProgress, 1000);
  }
};

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
  progress = 0;
  progressBar.style.width = "0%";
  simulateProgress();
});

// Aggiungere il Brano ai Preferiti
const addToFavorite = () => {
  const likeSong = document.getElementById("likeSong");

  likeSong.addEventListener("click", () => {
    likeSong.classList.toggle("bi-heart");
    likeSong.classList.toggle("bi-heart-fill");
    likeSong.classList.toggle("favoriteSongs");
  });
};

addToFavorite();

const volumeControl = document.querySelector("#playbarMobile .volumeControl");

volumeControl.addEventListener("input", function () {
  const volume = this.value; // Ottiene il valore corrente del volume
  this.style.setProperty("--volume-level", `${volume}%`);
});

const volumeControl1 = document.querySelector("#playbarDesktop .volumeControl");

volumeControl1.addEventListener("input", function () {
  const volume = this.value;
  this.style.setProperty("--volume-level", `${volume}%`);
});
// Enlarge - Reduce
const enlargeReduce = () => {
  const enlargeReduce = document.getElementById("enlargeReduce");

  enlargeReduce.addEventListener("click", () => {
    enlargeReduce.classList.toggle("bi-arrows-angle-expand");
    enlargeReduce.classList.toggle("bi-arrows-angle-contract");
  });
};

enlargeReduce();
