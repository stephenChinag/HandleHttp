import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
const [movies, setMovies]= useState([])


 function fetchMovieHandler (){
  fetch('https://swapi.dev/api/films' ).then(respone=>{
    return respone.json();
  }).then(data =>{
    const transformMovies = data.results.map(movieData=> {
      return {
        id : movieData.episone_id,
        releaseDate:movieData.release_date,
        title:movieData.title,
        openingText:movieData.opening_crawl
      }

    })
   setMovies(transformMovies)
  })


 }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
