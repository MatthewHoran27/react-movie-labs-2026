import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e, value) => {
    handleChange(null, "minRating", value);
  };

  const handleReleaseYearChange = (e) => {
    handleChange(e, "releaseYear", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
        sx={{...formControl}}
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={props.titleFilter}
        onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          sx={{...formControl}}
          id="release-year"
          label="Release Year"
          type="number"
          variant="filled"
          inputProps={{ min: "1900", max: new Date().getFullYear() }}
          value={props.releaseYear}
          onChange={handleReleaseYearChange}
        />
        <Box>
          <Typography id="rating-slider" variant="body2" sx={{marginBottom: 1, fontWeight: 600}}>
            Minimum Rating: {props.minRating || "Any"}
          </Typography>
          <Slider
            id="min-rating-slider"
            aria-labelledby="rating-slider"
            min={0}
            max={10}
            step={0.5}
            value={Number(props.minRating) || 0}
            onChange={handleRatingChange}
            marks={[
              { value: 0, label: "0" },
              { value: 5, label: "5" },
              { value: 10, label: "10" }
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
