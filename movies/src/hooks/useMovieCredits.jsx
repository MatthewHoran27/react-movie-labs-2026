import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from '../api/tmdb-api'

const useMovieCredits = id => {
  return useQuery({
    queryKey: ['movieCredits', { id }],
    queryFn: getMovieCredits,
  });
};

export default useMovieCredits;