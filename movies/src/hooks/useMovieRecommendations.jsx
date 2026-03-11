import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from '../api/tmdb-api'

const useMovieRecommendations = id => {
  return useQuery({
    queryKey: ['movieRecommendations', { id }],
    queryFn: getMovieRecommendations,
  });
};

export default useMovieRecommendations;