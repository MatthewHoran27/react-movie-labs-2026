import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import PageTitleContextProvider from "./contexts/pageTitleContext";
import SiteFooter from './components/siteFooter';
import { ThemeContextProvider, ThemeContext } from './contexts/themeContext';

// Assignment Page Imports
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageTitleContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/playlist" element={<PlaylistMoviesPage />} />
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/movies/upcoming" element={ <UpcomingMoviesPage /> } />

              {/* Assignment Static Endpoints Routes */}
              <Route path="/movies/nowPlaying" element={<NowPlayingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/topRated" element={<TopRatedMoviesPage />} />
            </Routes>
          </MoviesContextProvider>
          <SiteFooter />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PageTitleContextProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
