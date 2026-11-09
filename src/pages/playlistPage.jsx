
import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  // Fetch the movies saved in the playlist.
  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  // Display a spinner while movies are loading.
  const isPending = playlistMovieQueries.some((m) => m.isPending);

  if (isPending) {
    return <Spinner />;
  }

  // Display an error if a movie could not be fetched.
  const errorQuery = playlistMovieQueries.find((q) => q.isError);

  if (errorQuery) {
    return <p>{errorQuery.error.message}</p>;
  }

  const movies = playlistMovieQueries.map((q) => {
    return {
      ...q.data,
      genre_ids: q.data.genres.map((g) => g.id),
    };
  });

  return (
    <PageTemplate
      title="My Playlist"
      movies={movies}
      action={(movie) => (
        <RemoveFromPlaylist movie={movie} />
      )}
    />
  );
};

export default PlaylistPage;
