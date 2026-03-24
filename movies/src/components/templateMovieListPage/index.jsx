import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [minRating, setMinRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (minRating === "") return true;
      return m.vote_average >= Number(minRating);
    })
    .filter((m) => {
      if (releaseYear === "") return true;
      const movieYear = m.release_date ? m.release_date.split("-")[0] : "";
      return movieYear === releaseYear;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "rating":
          return b.vote_average - a.vote_average;
        case "rating-asc":
          return a.vote_average - b.vote_average;
        case "release-date":
          return new Date(b.release_date) - new Date(a.release_date);
        case "release-date-asc":
          return new Date(a.release_date) - new Date(b.release_date);
        case "popularity":
        default:
          return b.popularity - a.popularity;
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "minRating") setMinRating(value);
    else if (type === "releaseYear") setReleaseYear(value);
    else if (type === "sortBy") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            minRating={minRating}
            releaseYear={releaseYear}
            sortBy={sortBy}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
