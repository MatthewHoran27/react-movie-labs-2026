import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { PageTitleContext } from "../contexts/pageTitleContext";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  const { setPageTitle } = useContext(PageTitleContext);

  useEffect(() => {
    if (movie && movie.title) {
      setPageTitle(movie.title);
    }
  }, [movie, setPageTitle]);
  
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
