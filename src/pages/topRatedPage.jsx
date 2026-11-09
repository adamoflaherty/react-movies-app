
import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTopRatedMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};

export default TopRatedPage;
