import React, { useState } from 'react'
import {Header} from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import getMovies from './services/recommendationService'
import Card from 'react-bootstrap/Card'
import './App.css'

export default function App() {

  const [results, setResults] = useState([])
  const [input, setInput] = useState("")

  const handleInput = (e) => {
    let input = e.target.value
    console.log(input) 
    setInput(input)
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchResults = await getMovies();
    searchResults = [searchResults]
    setResults(searchResults)
  }

  const handleGenreFilter = (movie) => {
    let i;
    for (i = 0; i < movie.genres.length; i++) {
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

  const Movies = results && results.map((movieArray) => {
    return movieArray.map((movie) => {
      return handleGenreFilter(movie);
    })
  })
  
  return (
    <div>
      <Header />
      <SearchBar handleSearch={handleSearch} handleInput={handleInput} />
      <div className="moviesContainer">{Movies}</div>
    </div>
  )
}