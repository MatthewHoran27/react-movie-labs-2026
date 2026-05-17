import React from "react";
import Typography from "@mui/material/Typography";
import useMovieRecommendations from "../../hooks/useMovieRecommendations";
import Spinner from '../spinner'
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useMovieRecommendations(movie.id);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  const recommendations = data.results;

  return (
    <Grid container>
      {recommendations.map((m) => (
        <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
          <Movie key={m.id} movie={m} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieRecommendations;