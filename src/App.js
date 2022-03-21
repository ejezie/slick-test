import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.scss';
import Banner from './components/Banner';
import Navbar from './components/Navbar';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false)
  const [actionMovies, setActionMoviesList] = useState([])
  const [adventureMovies, setAdventureMoviesList] = useState([])
  const [searchResults, setSearchResults] = useState([])


  async function fetchData(searchParam, setterFunction, isSearchQuery) {
    // the key in the state of movies list to append the data to
    isSearchQuery && setSearchLoading(true)
    // make the request
    const result = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=2eca3a1&s=${searchParam}`
    );
    setterFunction(result.data.Search)
    isSearchQuery && setSearchLoading(false);
  }

  useEffect(() => {
    fetchData('action', setActionMoviesList);
    fetchData("adventure", setAdventureMoviesList);
  }, []);

  // Debouce timer implementation
  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchData(searchTerm, setSearchResults, true);
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <div className="row center">
        <div className="search center">
          <form action="" className="form">
            <div className="input-group center">
              <label htmlFor="search">Search</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="wrap">
          {searchLoading ? <div className='loading-indicator'>Loading ....</div> : null}
          {searchTerm ? (
            <div>
              <div className="title">SearchResults</div>
              <div className="row-wrap">
                {searchResults?.map((item, index) => {
                  return (
                    <div className="content" key={item.imdbID}>
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
          ) : null}
          {!searchTerm ? (
            <div>
              <div className="title">Action</div>
              <div className="row-wrap">
                {actionMovies.map((item, index) => {
                  return (
                    <div className="content" key={item.imdbID}>
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
          ) : null}
        </div>
        <div className="wrap">
          {!searchTerm ? (
            <div>
              <div className="title">Adventure</div>
              <div className="row-wrap">
                {adventureMovies.map((item, index) => {
                  return (
                    <div className="content" key={item.imdbID}>
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
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
