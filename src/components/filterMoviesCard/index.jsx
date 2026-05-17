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
import { useTheme } from "@mui/material/styles";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


const formControl = 
  {
    margin: 1,
    minWidth: "150px",
    backgroundColor: "transparent"
  };

export default function FilterMoviesCard(props) {

  const theme = useTheme();

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

  const handleSortChange = (e) => {
    handleChange(e, "sortBy", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
        width: "100%"
      }} 
      variant="outlined">
      <CardContent sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: "12px 16px",
        flexWrap: "wrap"
      }}>
        <Typography variant="h6" component="h1" sx={{minWidth: "auto", whiteSpace: "nowrap"}}>
          <SearchIcon fontSize="medium" sx={{verticalAlign: "middle", marginRight: "4px"}} />
          Filter
        </Typography>
        <TextField
        sx={{...formControl}}
        id="filled-search"
        label="Search"
        type="search"
        variant="outlined"
        size="small"
        value={props.titleFilter}
        onChange={handleTextChange}
        />
        <FormControl sx={{...formControl, minWidth: "120px"}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
            size="small"
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
          variant="outlined"
          size="small"
          inputProps={{ min: "1900", max: new Date().getFullYear() }}
          value={props.releaseYear}
          onChange={handleReleaseYearChange}
        />
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 1}}>
          <Typography variant="body2" sx={{fontWeight: 600, minWidth: "auto"}}>
            Min Rating: {props.minRating || "Any"}
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
            sx={{width: "120px"}}
          />
        </Box>
        <FormControl sx={{...formControl, minWidth: "180px"}}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            defaultValue="popularity"
            value={props.sortBy}
            onChange={handleSortChange}
            size="small"
          >
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="title">Title (A to Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z to A)</MenuItem>
            <MenuItem value="rating">Rating (High to Low)</MenuItem>
            <MenuItem value="rating-asc">Rating (Low to High)</MenuItem>
            <MenuItem value="release-date">Release Date (Newest)</MenuItem>
            <MenuItem value="release-date-asc">Release Date (Oldest)</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
