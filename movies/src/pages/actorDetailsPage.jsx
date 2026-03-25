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

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { setPageTitle } = useContext(PageTitleContext);

  const [actorQuery, creditsQuery] = useQueries({
    queries: [
      {
        queryKey: ["actor", { id }],
        queryFn: getPersonDetails,
      },
      {
        queryKey: ["actorCredits", { id }],
        queryFn: getPersonMovieCredits,
      },
    ],
  });

  const { data: actor, isPending: actorPending, isError: actorError } = actorQuery;
  const { data: creditsData, isPending: creditsPending, isError: creditsError } = creditsQuery;

  useEffect(() => {
    if (actor?.name) {
      setPageTitle(actor.name);
    }
  }, [actor?.name, setPageTitle]);

  if (actorPending || creditsPending) {
    return <Spinner />;
  }

  if (actorError) {
    return (
      <Typography variant="h6" color="error">
        Error loading actor details
      </Typography>
    );
  }

  const castMovies = creditsData?.cast || [];
  const sortedMovies = castMovies.sort((a, b) => b.popularity - a.popularity);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flex: "0 0 300px", minWidth: 0 }}>
            {actor?.profile_path ? (
              <Card>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
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
              {actor?.name}
            </Typography>

            {actor?.birthday && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Born:</strong> {new Date(actor.birthday).toLocaleDateString()}
                {actor?.place_of_birth && ` in ${actor.place_of_birth}`}
              </Typography>
            )}

            {actor?.also_known_as && actor.also_known_as.length > 0 && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Also Known As:</strong> {actor.also_known_as.join(", ")}
              </Typography>
            )}

            {actor?.biography && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {actor.biography}
                </Typography>
              </>
            )}

            {actor?.popularity && (
              <Typography variant="caption" sx={{ mt: 2, display: "block", color: "text.secondary" }}>
                Popularity Score: {Math.round(actor.popularity * 10) / 10}
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
            No movies found for this actor.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ActorDetailsPage;
