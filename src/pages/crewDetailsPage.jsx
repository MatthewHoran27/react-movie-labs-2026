import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { PageTitleContext } from "../contexts/pageTitleContext";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import WriteReview from "../components/cardIcons/writeReview";
import AddToFavorites from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Movie from "../components/movieCard";

const CrewDetailsPage = () => {
  const { id } = useParams();
  const { setPageTitle } = useContext(PageTitleContext);

  const [crewQuery, creditsQuery] = useQueries({
    queries: [
      {
        queryKey: ["crew", { id }],
        queryFn: getPersonDetails,
      },
      {
        queryKey: ["crewCredits", { id }],
        queryFn: getPersonMovieCredits,
      },
    ],
  });

  const { data: crew, isPending: crewPending, isError: crewError } = crewQuery;
  const { data: creditsData, isPending: creditsPending, isError: creditsError } = creditsQuery;

  useEffect(() => {
    if (crew?.name) {
      setPageTitle(crew.name);
    }
  }, [crew?.name, setPageTitle]);

  if (crewPending || creditsPending) {
    return <Spinner />;
  }

  if (crewError) {
    return (
      <Typography variant="h6" color="error">
        Error loading crew details
      </Typography>
    );
  }

  const allMovies = [
    ...creditsData?.cast || [],
    ...creditsData?.crew || []
  ];

  const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
  const sortedMovies = uniqueMovies.sort((a, b) => b.popularity - a.popularity);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flex: "0 0 300px", minWidth: 0 }}>
            {crew?.profile_path ? (
              <Card>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                  alt={crew.name}
                  sx={{ borderRadius: 1 }}
                />
              </Card>
            ) : (
              <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                  No image available
                </Typography>
              </Card>
            )}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h4" sx={{ mb: 2, fontFamily: 'PixelGame' }}>
              {crew?.name}
            </Typography>

            {crew?.birthday && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Born:</strong> {new Date(crew.birthday).toLocaleDateString()}
                {crew?.place_of_birth && ` in ${crew.place_of_birth}`}
              </Typography>
            )}

            {crew?.also_known_as && crew.also_known_as.length > 0 && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Also Known As:</strong> {crew.also_known_as.join(", ")}
              </Typography>
            )}

            {crew?.biography && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {crew.biography}
                </Typography>
              </>
            )}

            {crew?.popularity && (
              <Typography variant="caption" sx={{ mt: 2, display: "block", color: "text.secondary" }}>
                Popularity Score: {Math.round(crew.popularity * 10) / 10}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'PixelGame' }}>
          Filmography ({sortedMovies.length} movies)
        </Typography>

        {sortedMovies.length > 0 ? (
          <Grid container>
            {sortedMovies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ padding: "20px" }}>
                <Movie
                  movie={movie}
                  action={(m) => (
                    <>
                      <AddToFavorites movie={m} />
                      <AddToPlaylistIcon movie={m} />
                      <WriteReview movie={m} />
                    </>
                  )}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No movies found for this crew member.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CrewDetailsPage;
