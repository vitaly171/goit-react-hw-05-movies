/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import slugify from 'slugify';
import Status from '../../services/status';
import s from './HomeView.module.css';
import LoaderComponent from '../../components/LoaderComponent';
import ErrorView from '../../components/ErrorView';
import noImageFound from '../../img/no-image.jpg';

const makeSlug = string => slugify(string, { lower: true });

export default function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    setStatus(Status.PENDING);
    apiService
      .getTrending(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, [page]);

  return (
    <main>
      <h1 className={s.title}>Trending today</h1>

      {status === Status.PENDING && <LoaderComponent />}

      {status === Status.REJECTED && <ErrorView message={error.message} />}

      {status === Status.RESOLVED && (
        <>
          <ul className={s.moviesList}>
            {movies.map(movie => (
              <li key={movie.id} className={s.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${makeSlug(
                      `${movie.title} ${movie.id}`,
                    )}`,
                    state: { from: location },
                  }}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noImageFound
                    }
                    alt={movie.title}
                    className={s.poster}
                  />
                </Link>
                <span className={s.movieTitle}>{movie.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
