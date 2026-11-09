
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations, getMovieCredits } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import MovieListPageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const {
    data: recommendations,
    error: recommendationsError,
    isPending: recommendationsPending,
    isError: recommendationsIsError
  } = useQuery({
    queryKey: ['recommendations', { id: id }],
    queryFn: getMovieRecommendations,
    enabled: !!id,
  });

  const {
    data: credits,
    error: creditsError,
    isPending: creditsPending,
    isError: creditsIsError
  } = useQuery({
    queryKey: ['credits', { id: id }],
    queryFn: getMovieCredits,
    enabled: !!id,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>

          <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Movie Cast
            </Typography>

            {creditsPending ? (
              <Spinner />
            ) : creditsIsError ? (
              <p>{creditsError.message}</p>
            ) : (
              <Grid container spacing={2}>
                {credits?.cast?.slice(0, 10).map((actor) => (
                  <Grid
                    key={actor.cast_id || actor.id}
                    size={{ xs: 6, sm: 4, md: 2 }}
                  >
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                            : 'https://placehold.co/300x450?text=No+Photo'
                        }
                        alt={actor.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="subtitle1">
                          {actor.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {actor.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {recommendationsPending ? (
            <Spinner />
          ) : recommendationsIsError ? (
            <p>{recommendationsError.message}</p>
          ) : (
            <MovieListPageTemplate
              title="Recommended Movies"
              movies={recommendations?.results || []}
              action={() => null}
            />
          )}
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
