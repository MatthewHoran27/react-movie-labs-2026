import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMovieCredits from "../../hooks/useMovieCredits";
import Spinner from '../spinner'

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieCredits = ({ movie }) => {
  const { data, error, isPending, isError } = useMovieCredits(movie.id);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  const credits = data;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Cast
      </Typography>
      <Paper component="ul" sx={{...root}}>
        {credits.cast.map((c) => (
          <li key={c.id}>
            <Chip
              label={`${c.name} as ${c.character}`}
              sx={{
                ...chip
              }}
            />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Crew
      </Typography>
      <Paper component="ul" sx={{...root}}>
        {credits.crew.map((c) => (
          <li key={`${c.id}-${c.job}`}>
            <Chip
              label={`${c.name} (${c.job})`}
              sx={{
                ...chip
              }}
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default MovieCredits;