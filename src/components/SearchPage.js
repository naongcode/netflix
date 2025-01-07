import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from '../api/axios'
import { useDebounce } from "./hooks/useDebounce";
import "./SearchPage.css";
import MovieModal from "./MovieModal";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState(null);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    console.log("searchTerm", searchTerm);
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div onClick={() => {setModalOpen(true);setMovieSelected(movie)}}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
              {modalOpen && 
        (<MovieModal 
          movieId={movieSelected.id} 
          {...movieSelected} 
          setModalOpen={setModalOpen}/>)}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
