import React, { useContext, useEffect } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { PageTitleContext } from "../contexts/pageTitleContext";

const TopRatedMoviesPage = (props) => {
  const { setPageTitle } = useContext(PageTitleContext);

  useEffect(() => {
    setPageTitle("Top Rated");
  }, [setPageTitle]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

   return (
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return (
            <>
              <AddToFavoritesIcon movie={movie} />
              <AddToPlaylistIcon movie={movie} />
            </>
          )
        }}
      />
  );
};

export default TopRatedMoviesPage;