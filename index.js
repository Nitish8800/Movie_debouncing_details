function getMovie() {
    let movie = document.getElementById("input").value;

    async function makeRequest() {
      let res = await fetch(
        `http://www.omdbapi.com/?apikey=381f166f&t=${movie}`
      );
      let data = await res.json();
      appendMovie(data);
      console.log(data);
    }
    makeRequest();
  }

  let movie = document.getElementById("show");

  function appendMovie(movieData) {
    movie.textContent = "";
    console.log(movieData);
    if (movieData.Poster == undefined) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src =
        "https://media1.giphy.com/media/TqiwHbFBaZ4ti/200w.webp?cid=ecf05e47cf847n5wgobf6e6gculu9qfci73wh59f12mivl7l&rid=200w.webp&ct=g";

      div.append(img);

      movie.append(div);

      return;
    } else {
      if (movieData.Poster != "N/A") {
        div = document.createElement("div");

        image = document.createElement("img");
        image.src = movieData.Poster;

        let Year = document.createElement("h3");
        Year.innerHTML = `${movieData.Released}`;

        let title = document.createElement("h2");
        title.innerHTML = movieData.Title;

        let RateThemovie = document.createElement("h2");
        RateThemovie.innerHTML = `⭐ ${movieData.imdbRating}`;

        if (movieData.imdbRating > 8.5) {
          let re = document.createElement("button");
          re.innerHTML = "RECOMMENDED";
          re.id = "btun";

          div.append(image, title, Year, RateThemovie, re);
        } else {
          div.append(image, title, Year, RateThemovie);
        }
        movie.append(div);
      }
    }
  }

  var id;
  let d = 500;
  function debounce() {
    if (id) clearTimeout(id);
    id = setTimeout(function () {
      fun();
    }, d);
  }
  function fun() {
    let movie = document.querySelector("#input").value;

    fetchData(movie);
  }
  async function fetchData(movie) {
    try {
      url = "https://www.omdbapi.com/?apikey=381f166f&s=" + movie;
      let response = await fetch(url);
      let data = await response.json();
      display(data.Search);
    } catch (error) {
      console.log(error);
    }
  }
  function display(array) {
    if (array == undefined) return;
    console.log(array);
    let box = document.querySelector(".showData");
    box.style.display = "block";

    box.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
      let element = array[i];
      let div = document.createElement("div");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");

      let img = document.createElement("img");
      let name = document.createElement("h4");
      let type = document.createElement("p");
      img.src = element.Poster;
      if (element.Poster == "N/A") continue;
      name.textContent = element.Title;
      type.textContent = element.Year;

      div.setAttribute("class", "ms-1 row mt-2");
      div1.setAttribute("class", "col-5");
      div2.setAttribute("class", "col-7 pt-4");
      div1.append(img);
      div2.append(name, type);

      div.addEventListener("click", function () {
        fetchFunc(element.Title);
      });
      div.append(div1, div2);
      box.append(div);
    }
  }

  function fetchFunc(movie_name) {
    url = "https://www.omdbapi.com/?apikey=381f166f&t=" + movie_name;
    fetch(url).then(async function (result) {
      let data = await result.json();
      var obj = {
        name: data.Title,
        Actors: data.Actors,
        imdbRating: data.imdbRating,
        posterUrl: data.Poster,
        plot: data.Plot,
        Year: data.Year,
      };

      var img = document.createElement("img");
      img.src = obj.posterUrl;
      document.querySelector("#b1").textContent = "";
      document.querySelector("#b1").append(img);

      document.querySelector("#a").textContent = obj.name;
      document.querySelector("#b").textContent = obj.Actors;
      document.querySelector("#c").textContent = obj.imdbRating;
      document.querySelector("#d").textContent = obj.plot;
      document.querySelector("#e").textContent = obj.Year;
      document.querySelector("#show").style.opacity = "1";
    });
  }

  function refresh() {
    location.reload();
  }