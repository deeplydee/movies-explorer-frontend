import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './App.css';
import NavTab from '../NavTab/NavTab';

function App() {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="app">
      {pathname === '/' ||
      pathname === '/movies' ||
      pathname === '/saved-movies' ||
      pathname === '/profile' ? (
        <Header loggedIn={loggedIn} />
      ) : (
        ''
      )}
      {pathname === '/' ||
      pathname === '/movies' ||
      pathname === '/saved-movies' ||
      pathname === '/profile' ? (
        <NavTab />
      ) : (
        ''
      )}
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn}></Main>
        </Route>
        <Route exact path="/movies">
          <Movies></Movies>
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies></SavedMovies>
        </Route>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route exact path="/signup">
          <Register></Register>
        </Route>
        <Route exact path="/signin">
          <Login></Login>
        </Route>
        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
      {pathname === '/' ||
      pathname === '/movies' ||
      pathname === '/saved-movies' ? (
        <Footer />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
