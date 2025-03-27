document.addEventListener("DOMContentLoaded", () => {
  const albumIds = [
    "915798", //Il Sogno Eretico - Caparezza
    "288645872", //Kyougen - Ado
    "10655968", //Skills In Pills - Linndeman
    "331818647", //Mercury - Immagine Dragons
    "12114240", //Dark Side Of The Moon - Pink Floyd
    "61504292", //September - Earth, Wind And Fire
    "603420362", //Trollslayer - Wind Rose
    "434301617", //Hajimeteno - Yaosobi
    "730631321", //Volevo Essere Un Duro - Lucio Corsi
    "699739251", //Till The Curtain Call - The Vanished People
  ];

  albumIds.forEach((id, i) => {
    const albumURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`;
    const albumCardTitle = document.getElementsByClassName("albumCardTitle");
    const albumCardImg = document.getElementsByClassName("albumCardImg");
    const albumCardArtist = document.getElementsByClassName("albumCardArtist");
    const albumCardHref = document.getElementsByClassName("albumCardHref");
    fetch(albumURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei dati");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);

        if (albumCardTitle[i]) {
          albumCardImg[i].src = data.cover_medium;
          albumCardHref[i].href = "/album-page.html?album-id=" + id;
          albumCardTitle[i].innerText = data.title;
          albumCardArtist[
            i
          ].innerHTML = `<a href="/artista.html?id=${data.artist.id}">${data.artist.name}</a>`;
        }
      })
      .catch((error) => console.error("Errore nel recupero dati:", error));
  });

  // Canzone in Primo Piano
  const closeAppSongId = "476910655"; // Specialz
  const closeAppSongURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${closeAppSongId}`;

  const closeAppSong = () => {
    // Elementi per la parte mobile
    const closeAppSongTitle = document.getElementById("closeAppSongTitle");
    const closeAppSongArtist = document.getElementById("closeAppSongArtist");
    const closeAppSongNew = document.getElementById("closeAppSongNew");
    const closeAppSongImg = document.getElementById("closeAppSongImg");

    // Elementi per la parte desktop
    const playbarDesktopSongImg = document.querySelector(
      "#playbarDesktop .actualSong"
    );

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
          data.cover_big &&
          data.title &&
          data.contributors.length > 0
        ) {
          closeAppSongImg.src = data.cover_big;
          closeAppSongTitle.innerText = data.title;
          closeAppSongArtist.innerText = data.artist.name;
          closeAppSongNew.innerText = `Ascolta ora il nuovo brano di ${data.artist.name}`;

          if (playbarDesktopSongImg) {
            playbarDesktopSongImg.src = data.cover_big;
          }
        } else {
          console.error("Dati non validi:", data);
        }
      })
      .catch((error) => console.error("Errore nel recupero dati:", error));
  };

  closeAppSong();
});
