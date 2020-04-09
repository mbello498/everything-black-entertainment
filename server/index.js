const express = require("express");
const app = express();
const tmdb = require("tmdbv3").init(process.env.Token);
const api = require("./middleware/api");

const port = process.env.PORT || "3000";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", api, (req, res) => {
  let returned_response = [];
  let genres = [];

  tmdb.genre.list((err, response) => {
    genres = [...response.genres];
  });

  tmdb.search.movie("African American", (error, response) => {
    response.results.forEach(movie => {
      let object = {};
      object.title = movie.original_title;
      object.overview = movie.overview;
      object.poster = movie.poster_path;
      object.genres = [];
      genres.forEach(genre => {
        for (let i = 0; i < movie.genre_ids.length; i++) {
          if (genre.id === movie.genre_ids[i]) {
            object.genres.push(genre.name);
            break;
          }
        }
      });
      returned_response.push(object);
    });
    res.send(returned_response);
  });
});

app.listen(port, () => {
  console.log("it works");
});
