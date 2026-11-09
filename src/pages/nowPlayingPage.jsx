import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { getNowPlayingMovies } from "../api/tmdb-api";

const  NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getNowPlayingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);
  
  return (
    <PageTemplate
      title='Now Playing Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default NowPlayingPage;
