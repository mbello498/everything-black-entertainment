import React, {useState} from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import getMovies from './services/movieService';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  const [input, setInput] = useState("");
  const [movieResults, setMovieResults] = useState([]);

  const handleInput = function(e) {
    setInput(e.target.value)
  }

  const handleSearch = async function(e) {
    e.preventDefault();
    let response = await getMovies();
    response = [response]
    setMovieResults(response)
  }

  const handleGenreFilter = (movie) => {
    let i;
    for(i = 0; i < movie.genres.length; i++) {
      if(movie.genres[i].toLowerCase() === input.toLowerCase()) {
        return (
          <Card className="card">
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + movie.poster} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
            </Card.Body>
          </Card>
        )
      }
    }
  }

  const Movies = movieResults && movieResults.map((movieArray) => {
    return movieArray.map((movie) => {
      return handleGenreFilter(movie);
    })
  })

  return (
    <div>
      <Header />
      <SearchBar handleInput={handleInput} handleSearch={handleSearch} />
      <div className="moviesContainer">{Movies}</div>
    </div>
  );
}