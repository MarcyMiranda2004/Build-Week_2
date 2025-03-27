const songImport = function () {
  let params = new URLSearchParams(document.location.search);
  let albumID = params.get("album-id");
  const apiLink = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`;
  fetch(apiLink, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("tutto ok");
        return response.json();
      } else {
        throw new Error("qualquadra non cosa");
      }
    })
    .then((data) => {
      console.log("DATA:", data);
      const appendElement = document.getElementById("import-container");
      const imgAlbum = document.getElementById("img-album");
      const singerImg = document.getElementById("singer-img");
      const albumData = document.getElementById("dati-album");
      const albumName = document.getElementById("album-name");
      const playBarImg = document.getElementById("playbarCloseAppSongImg");
      const playBarTilte = document.getElementById("playbarCloseAppSongTitle");
      const playbarSongArtist = document.getElementById(
        "playbarCloseAppSongArtist"
      );
      const playbarCloseMobileSongImg = document.getElementById(
        "playbarCloseMobileSongImg"
      );
      const playbarCloseMobileSongAartist = document.getElementById(
        "playbarCloseMobileSongArtist"
      );
      const playbarCloseMobileSongTitle = document.getElementById(
        "playbarCloseMobileSongTitle"
      );

      playBarImg.src = data.cover;
      singerImg.src = data.artist.picture;
      imgAlbum.src = data.cover;
      playbarCloseMobileSongImg.src = data.cover;
      playBarTilte.innerHTML = `${data.tracks.data[0].title}`;
      playbarCloseMobileSongTitle.innerHTML = `${data.tracks.data[0].title}`;
      playbarSongArtist.innerHTML = `${data.artist.name}`;
      playbarCloseMobileSongAartist.innerHTML = `${data.artist.name}`;
      imgAlbum.width = 120;
      imgAlbum.height = 120;
      playbarCloseMobileSongImg.width = 50;
      playbarCloseMobileSongImg.height = 50;

      albumData.innerHTML = `${data.artist.name} - ${data.release_date} - ${
        data.nb_tracks
      } - ${(data.duration / 60).toFixed(2)}`;
      albumName.innerHTML = `${data.title} `;
      appendElement.innerHTML = ` `;
      let i = 1;
      data.tracks.data.forEach((song) => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row", "mt-3");
        const columnElement = document.createElement("div");
        columnElement.classList.add(
          "col",
          "d-flex",
          "align-items-center",
          "gap-2",
          "col-7"
        );

        columnElement.id = i;
        columnElement.innerHTML = `<div>${columnElement.id}</div>
                <div>
                  <h4>${song.title}</h4>
                  <span>${song.artist.name}</span>
                  `;
        const columnElementB = document.createElement("div");
        columnElementB.classList.add(
          "col",
          "col-3",
          "text-center",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "hide"
        );
        columnElementB.innerHTML = `${song.rank}`;
        const columnElementC = document.createElement("div");
        columnElementC.classList.add(
          "col",
          "col-2",
          "text-center",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "hide"
        );
        columnElementC.innerHTML = `${(song.duration / 60).toFixed(2)}`;
        rowElement.append(columnElement, columnElementB, columnElementC);
        appendElement.append(rowElement);
        i++;
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};
songImport();
