import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { addBackToTop } from 'vanilla-back-to-top';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import AppBar from './components/AppBar';
import LoaderComponent from './components/LoaderComponent';

const HomeView = lazy(() =>
  import('./view/HomeView' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./view/MoviesView' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './view/MovieDetailsPage' /* webpackChunkName: "movies-details-view" */
  ),
);

const NotFoundView = lazy(() =>
  import('./view/NotFoundView' /* webpackChunkName: "not-found-view" */),
);

export default function App() {
  useEffect(() => {
    addBackToTop({
      backgroundColor: ' #7e588f',
    });
  }, []);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} position="bottom-center" />
    </Container>
  );
}
