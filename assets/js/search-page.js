document.addEventListener("DOMContentLoaded", () => {
  const searchCamp = document.getElementById("searchCamp");
  const searchButton = document.getElementById("searchButton");
  const searchForm = document.getElementById("searchForm");
  const resultsContainer = document.getElementById("resultsContainer");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchCamp.value.trim();
    if (!query) return;

    const searchURL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

    fetch(searchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dati");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Data:", data);
        showResults(data.data);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });

    const showResults = (results) => {
      const categoryContainer = document.getElementById("categoryContainer");
      const resultsContainer = document.getElementById("resultsContainer");

      categoryContainer.classList.add("d-none");
      resultsContainer.innerHTML = "";

      results.forEach((track) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add(
          "col-5",
          "col-md-4",
          "col-lg-2",
          "d-flex",
          "flex-column",
          "p-2",
          "bg-secondary",
          "rounded-3"
        );

        resultItem.innerHTML = `
        
        <img
          src="${track.album.cover_medium}"
          alt="song_cover"
          class="albumCardImg cursor-pointer rounded-3 m-2"
        />
        <div class="container mt-2">
          <h6 class="albumCardTitle">${track.title}</h6>
          <p class="albumCardArtist"><a href="/artista.html?id=${track.artist.id}">${track.artist.name}</a></p>
        </div>
      `;

        resultsContainer.appendChild(resultItem);
      });
    };
  });
});
//Sezione Playbar//
//Aggiorna dinamicamente barra volume//
const volumeControl = document.querySelector("#playbarMobile .volumeControl");

volumeControl.addEventListener("input", function () {
  const volume = this.value; // Ottiene il valore corrente del volume
  this.style.setProperty("--volume-level", `${volume}%`);
});

//Aggiorna dinamicamente barra volume//
const volumeControl1 = document.querySelector("#playbarDesktop .volumeControl");

volumeControl1.addEventListener("input", function () {
  const volume = this.value; // Ottiene il valore corrente del volume
  this.style.setProperty("--volume-level", `${volume}%`);
});
document.getElementById("shuffleButton").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.getElementById("loopButton").addEventListener("click", function () {
  this.classList.toggle("active");
});

// Canzone in Primo Piano
// Canzone in Primo Piano
const closeAppSongId = "476910655"; // Specialz
const closeAppSongURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${closeAppSongId}`;

const closeAppSong = () => {
  const closeAppSongTitle = document.getElementById("playbarCloseAppSongTitle");
  const closeAppSongArtist = document.getElementById(
    "playbarCloseAppSongArtist"
  );
  const closeAppSongImg = document.getElementById("playbarCloseAppSongImg");

  fetch(closeAppSongURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data ricevuta:", data); // Log the data to verify

      if (
        data &&
        data.cover_big && // Make sure the cover_big exists
        data.title &&
        data.contributors.length > 0
      ) {
        // Set image in playbarMobile
        closeAppSongImg.src = data.cover_big;

        // Set the image in the desktop playbar as well
        const playbarDesktopSongImg = document.querySelector(
          "#playbarDesktop .actualSong"
        );
        if (playbarDesktopSongImg) {
          playbarDesktopSongImg.src = data.cover_big;
        }

        closeAppSongTitle.innerText = data.title;
        closeAppSongArtist.innerText = data.artist.name;
      } else {
        console.error("Dati non validi:", data);
      }
    })
    .catch((error) => console.error("Errore nel recupero dati:", error));
};

closeAppSong();

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
