import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import ShowMore from 'react-simple-show-more';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Status from '../../services/status';
import LoaderComponent from '../../components/LoaderComponent';
import ErrorView from '../../components/ErrorView';
import s from './Reviews.module.css';

export default function Reviews() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const location = useLocation();
  const [reviews, setReviews] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    apiService
      .getMovieReviews(movieId, page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          toast.error("💩 We don't have any reviews for this movie.");
          setStatus(Status.IDLE);
          return;
        }
        setReviews(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId, page, setTotalPage]);

  return (
    <>
      {status === Status.PENDING && <LoaderComponent />}

      {status === Status.REJECTED && <ErrorView message={error} />}

      {status === Status.RESOLVED && (
        <>
          <ul>
            {reviews.map(review => (
              <li key={review.id} className={s.item}>
                <h4 className={s.author}>Author: {review.author}</h4>
                <p className={s.content}>
                  <ShowMore
                    text={review.content}
                    length={700}
                    showMoreLabel=" Show more >>"
                    showLessLabel=" Show less <<"
                    style={{
                      cursor: 'pointer',
                      color: '#ff6b08',
                      fontWeight: 'bold',
                    }}
                  />
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
