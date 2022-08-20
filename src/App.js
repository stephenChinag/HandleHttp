import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
const [movies, setMovies]= useState([])
const [isLoading ,setIsLoading]= useState(false)
const [error ,setError]=useState(null)



 const fetchMovieHandler= useCallback( async ()=>{
  setIsLoading(true)
  setError(null)
  try{
  const response = await fetch('https://swapi.dev/api/films' )
 
 
  if(!response.ok){
    throw new Error("Sorry Something went Wrong!")
  }
  const data = await response.json()


    const transformMovies = data.results.map(movieData=> {
      return {
        id : movieData.episone_id,
        releaseDate:movieData.release_date,
        title:movieData.title,
        openingText:movieData.opening_crawl 
      }

    })
   setMovies(transformMovies)
   
  }
  catch(error){
    setError(error.message)
   
  }
  setIsLoading(false)

 },[])

 useEffect(()=>{
  fetchMovieHandler()

}, [fetchMovieHandler])
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading &&  movies.length===0 && !error &&  <p> no Movies Available Or try refresh buy clicking the </p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
