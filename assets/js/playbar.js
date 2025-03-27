document.getElementById("shuffleButton").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.getElementById("loopButton").addEventListener("click", function () {
  this.classList.toggle("active");
});

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
      console.log("Data ricevuta:", data);

      if (
        data &&
        data.cover_medium &&
        data.title &&
        data.contributors.length > 0
      ) {
        closeAppSongImg.src = data.cover_big;
        closeAppSongTitle.innerText = data.title;
        closeAppSongArtist.innerText = data.artist.name;
        closeAppSongNew.innerText = `Ascolta ora il nuovo brano di ${data.artist.name}`;
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
//Aggiorna dinamicamente barra volume//
const volumeControl = document.querySelector("#playbarDesktop .volumeControl");

volumeControl.addEventListener("input", function () {
  const volume = this.value; // Ottiene il valore corrente del volume
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
