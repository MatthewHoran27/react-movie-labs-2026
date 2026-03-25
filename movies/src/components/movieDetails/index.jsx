import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import MovieCredits from "../movieCredits"
import MovieRecommendations from "../movieRecommendations";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Paper sx={{ padding: 1.5, marginBottom: 2 }}>
        <Typography variant="body1" component="p">
          {movie.overview}
        </Typography>
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Genres
      </Typography>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Movie Details
      </Typography>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Production Countries
      </Typography>
      <Paper component="ul" sx={{...root}}>
        {movie.production_countries.map((p) => (
          <li key={p.name}>
            <Chip label={p.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      {/* Assignment Dynamic Endpoints */}
      <MovieCredits movie={movie} />
      <MovieRecommendations movie={movie} />

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;
