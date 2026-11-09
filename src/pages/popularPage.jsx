import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { getPopularMovies } from "../api/tmdb-api";

const  PopularPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getPopularMovies().then(movies => {
  setMovies(movies);
});
  }, []);
  
  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default PopularPage;
