import React from "react";
import { useState, useEffect } from "react";
import axios  from "axios";

function Row() {
  const [movies, setActionMovies] = useState([]);
  const [moviestwo, setAdventionMoviestwo] = useState([]);

  async function fetchData (searchParam = 'action') {
    console.log("fething data")
      const result = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=2eca3a1&s=${searchParam}`
      );
      setActionMovies(result.data.Search);
  }
  async function fetchDataTwo (searchParam = 'adventure') {
    console.log("fething data")
      const result = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=2eca3a1&s=${searchParam}`
      );
      setAdventionMoviestwo(result.data.Search);
  }

  useEffect(() => {
    fetchData();
    fetchDataTwo();
  }, []);

 
  return (
    <div className="row center">
      <div className="search center">
        <form action="" className="form">
          <div className="input-group center">
            <label htmlFor="search">Search</label>
            <input type="text" id="search" />
          </div>
        </form>
      </div>
      <div className="wrap">
        <div className="title">Action</div>
        <div className="row-wrap">
          {movies.map((item, index) => {
            return (
              <div className="content">
                <img
                  src={item.Poster}
                  alt="movie-poster"
                  className="movie-poster"
                />
                <div className="movie-name">{item.Title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="wrap">
        <div className="title">Adventure</div>
        <div className="row-wrap">
          {moviestwo.map((item, index) => {
            return (
              <div className="content">
                <img
                  src={item.Poster}
                  alt="movie-poster"
                  className="movie-poster"
                />
                <div className="movie-name">{item.Title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Row;
