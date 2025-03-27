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
          <p class="albumCardArtist">${track.artist.name}</p>
        </div>
      `;

        resultsContainer.appendChild(resultItem);
      });
    };
  });
});
