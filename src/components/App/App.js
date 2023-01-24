import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';

import './App.css';

import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';

import {
  EMAIL_ERR_MESSAGE,
  VALIDATION_ERR_MESSAGE,
  CREDENTIALS_ERR_MESSAGE,
  SUCCESSFUL_UPDATE_MESSAGE,
  SHORT_FILM_DURATION
} from '../../utils/constants';

function App() {
  const { pathname } = useLocation();
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorInfoText, setErrorInfoText] = useState();
  const [allBeatFilmMovies, setAllBeatFilmMovies] = useState(JSON.parse(localStorage.getItem('allBeatFilmMovies')) || []); //все фильмы с BeatFilm
  const [movies, setMovies] = useState([]); //найденные фильмы
  const [foundMoviesParams, setFoundMoviesParams] = useState([]); //фильмы по параметрам
  const [saveMovies, setSaveMovies] = useState([]); //сохранённые фильмы
  const [filterSaveMovies, setFilterSaveMovies] = useState(saveMovies); //отфильтрованные сохранённые
  const [requestKeyword, setRequestKeyword] = useState('');
  const [changeCheckbox, setChangeCheckbox] = useState(false);
  const [requestKeywordSaveMovies, setRequestKeywordSaveMovies] = useState('');
  const [changeCheckboxSaveMovies, setChangeCheckboxSaveMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [serverTextError, setServerErrorMessage] = useState(false);

  useEffect(() => {
    handleGetInfo();
    if (localStorage.getItem('loggedIn') === 'true') {
      setLoggedIn(true);
    }
    history.replace(pathname);
  }, [loggedIn]);

  useEffect(() => {
    const keyword = localStorage.getItem('requestKeyword' || '');
    // handleGetInfo();
    setRequestKeyword(keyword);
    // setRequestKeyword(localStorage.getItem('requestKeywordSaveMovies' || ''));
    setRequestKeywordSaveMovies(localStorage.getItem('requestKeywordSaveMovies' || ''));

    const checkBox = localStorage.getItem('changeCheckbox' || '') === 'true';
    setChangeCheckbox(checkBox);
    setChangeCheckboxSaveMovies(localStorage.getItem('changeCheckboxSaveMovies') === 'true');

    if (JSON.parse(localStorage.getItem('foundMoviesParams'))) {
      const movies = searchMoviesKeyword(allBeatFilmMovies, keyword, checkBox);
      setMovies(movies);

      if (movies.length === 0) {
        setNotFoundMovies(true);
      } else {
        setNotFoundMovies(false);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setRequestKeywordSaveMovies('');
      setChangeCheckboxSaveMovies(false);
      setNotFoundMovies(false);
      setSaveMovies(filterSaveMovies);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setRequestKeywordSaveMovies('');
      setChangeCheckboxSaveMovies(false);
      setNotFoundMovies(false);
      setSaveMovies(filterSaveMovies);
    }
  }, [location]);

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email: email, password: password });
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorInfoText(EMAIL_ERR_MESSAGE);
        } else {
          setErrorInfoText(VALIDATION_ERR_MESSAGE);
        }
        setTimeout(() => {
          setErrorInfoText('');
        }, 3000);
      });
  }

  function handleLogin({ email, password }) {
    return mainApi
      .login(email, password)
      .then((res) => {
        setLoggedIn(true);
        handleGetInfo();
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setErrorInfoText(CREDENTIALS_ERR_MESSAGE);
        } else {
          setErrorInfoText(VALIDATION_ERR_MESSAGE);
        }
        setTimeout(() => {
          setErrorInfoText('');
        }, 3000);
        setLoggedIn(false);
      });
  }

  function handleUpdateUser(newUserData) {
    mainApi
      .updateUserData(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        setErrorInfoText(SUCCESSFUL_UPDATE_MESSAGE);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorInfoText(EMAIL_ERR_MESSAGE);
        } else {
          setErrorInfoText(VALIDATION_ERR_MESSAGE);
        }
        if (err === 'Ошибка: 401') {
          handleSignOut();
        }
      })
      .finally(() => {
        setTimeout(() => {
          setErrorInfoText('');
        }, 3000);
      });
  }

  const handleGetInfo = () => {
    mainApi
      .getUserData()
      .then((data) => {
        const { email, name, _id } = data;
        setCurrentUser({ email, name, _id });
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', true);
          return true;
        });
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleSignOut();
        }
      });

    mainApi
      .getSavedMovies()
      .then((data) => {
        setLoggedIn(true);
        setSaveMovies(data);
        setFilterSaveMovies(data);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleSignOut();
        }
      });
  };

  const handleSignOut = () => {
    mainApi
      .signOut()
      .then((res) => {
        setCurrentUser({});
        localStorage.clear();
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', false);
          return false;
        });
        setMovies([]);
        setSaveMovies([]);
        setFoundMoviesParams(false);
        setChangeCheckbox(false);
        setRequestKeyword('');
        setFoundMoviesParams([]);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchMovies = (keyword) => { //поиск фильмов на movies
    localStorage.setItem('requestKeyword', keyword);
    localStorage.setItem('changeCheckbox', changeCheckbox);
    if (allBeatFilmMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem('allBeatFilmMovies', JSON.stringify(movies));
          setAllBeatFilmMovies(movies);
          handleSearchMoviesParams(movies, keyword, changeCheckbox);
        })
        .catch((err) => {
          setServerErrorMessage(true);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 200);
        });
    } else {
      handleSearchMoviesParams(allBeatFilmMovies, keyword, changeCheckbox);
    }
    setRequestKeyword(keyword); // // //
  };

  const handleSearchSubmitSavePage = (searchRequest) => { //поиск на saved-movies
    // localStorage.setItem('requestKeywordSaveMovies', searchRequest);
    localStorage.setItem('changeCheckboxSaveMovies', changeCheckboxSaveMovies);
    const moviesData = searchMoviesKeyword(
      filterSaveMovies,
      searchRequest,
      changeCheckboxSaveMovies
    );
    setRequestKeywordSaveMovies(searchRequest);
    if (moviesData.length === 0) {
      setNotFoundMovies(true);
      setSaveMovies(moviesData);
    } else {
      setNotFoundMovies(false);
      // setFilterSaveMovies(moviesData);
      // localStorage.setItem('filterSaveMovies', JSON.stringify(moviesData));
      setSaveMovies(moviesData);
    }
  };

  const handleSaveMovie = (movie) => { //сохранить фильм
    mainApi
      .addSavedMovie(movie)
      .then((addMovie) => {
        setSaveMovies([addMovie, ...saveMovies]);
        setFilterSaveMovies([addMovie, ...saveMovies]);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleSignOut();
        }
      });
  };

  const handleDeleteMovie = (movie) => { //удалить фильм
    const savedMovie = saveMovies.find((mov) => mov.movieId === movie.id);

    mainApi
      .deleteSavedMovie(movie._id || savedMovie._id)
      .then((movie) => {
        const updateSaveMovies = saveMovies.filter((i) => movie._id !== i._id);
        // localStorage.setItem('saveMovies', updateSaveMovies);
        localStorage.setItem('saveMovies', JSON.stringify(updateSaveMovies));
        setSaveMovies(updateSaveMovies);
        setFilterSaveMovies(updateSaveMovies);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleSignOut();
        }
      });
  };

  const isSaveMovies = (movie) => { //сохранён ли фильм
    return saveMovies.some(
      (i) => i.movieId === movie.id && i.owner === currentUser._id
    );
  };

  const handleSearchMoviesParams = (movies, keyword, checkbox) => { //найти фильмы по параметрам
    const moviesData = searchMoviesKeyword(movies, keyword, checkbox);

    if (moviesData.length === 0) {
      setNotFoundMovies(true);
    } else {
      setNotFoundMovies(false);
    }
    setMovies(moviesData);
    setFoundMoviesParams(checkbox ? searchShortFilms(moviesData) : moviesData);
    localStorage.setItem('foundMoviesParams', JSON.stringify(moviesData));
  };

  const handleShortFilmsSaveMovies = () => { //поиск короткометражек на saved-movies
    console.log(changeCheckboxSaveMovies);
    if (!changeCheckboxSaveMovies) {
      setChangeCheckboxSaveMovies(true);
      // localStorage.setItem('changeCheckboxSaveMovies', true);
      setSaveMovies(searchShortFilms(saveMovies));

      const movies = searchMoviesKeyword(
        filterSaveMovies,
        requestKeywordSaveMovies,
        !changeCheckboxSaveMovies
      );

      movies.length === 0
        ? setNotFoundMovies(true)
        : setNotFoundMovies(false);
    } else {
      setChangeCheckboxSaveMovies(false);
      // localStorage.setItem('changeCheckboxSaveMovies', false);
      filterSaveMovies.length === 0
        ? setNotFoundMovies(true)
        : setNotFoundMovies(false);
      setSaveMovies(searchMoviesKeyword(
        filterSaveMovies,
        requestKeywordSaveMovies,
        !changeCheckboxSaveMovies
      ));
    }
    setTimeout(() => {
      setNotFoundMovies(false);
    }, 2000);
  };

  const searchShortFilms = (movies) => { //поиск короткометражек
    return movies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);
  };

  const handleChangeCheckboxState = () => { //меняем состояние чекбокса на короткометражки
    setChangeCheckbox(!changeCheckbox);
    console.log(changeCheckbox);
    if (!changeCheckbox) {
      const movies = searchShortFilms(searchMoviesKeyword(allBeatFilmMovies, requestKeyword, true));
      setMovies(movies);
      if (movies.length === 0) {
        setNotFoundMovies(true);
      } else {
        setNotFoundMovies(false);
      }
    } else {
      const movies = searchMoviesKeyword(allBeatFilmMovies, requestKeyword, false);
      setMovies(movies);

      if (movies.length === 0) {
        setNotFoundMovies(true);
      } else {
        setNotFoundMovies(false);
      }
    }
    localStorage.setItem('changeCheckbox', !changeCheckbox);
  };

  const searchMoviesKeyword = (movies, keywordRaw, checkbox) => { //найти фильмы по ключевому слову
    const keyword = keywordRaw ?? '';
    const foundMoviesKeyword = movies.filter((movie) => {
      return (
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    if (checkbox) {
      return searchShortFilms(foundMoviesKeyword);
    } else {
      return foundMoviesKeyword;
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          <NavTab loggedIn={loggedIn} />
        ) : (
          ''
        )}
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn}></Main>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            movies={movies}
            onSubmit={handleSearchMovies}
            onSaveMovie={handleSaveMovie}
            onCheckboxState={handleChangeCheckboxState}
            checkedState={changeCheckbox}
            requestKeyword={requestKeyword}
            isLoading={isLoading}
            isSaveMovies={isSaveMovies}
            isNotFoundMovies={notFoundMovies}
            isServerTextError={serverTextError}
            onDeleteMovie={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={saveMovies}
            onSubmit={handleSearchSubmitSavePage}
            onDeleteMovie={handleDeleteMovie}
            onCheckboxState={handleShortFilmsSaveMovies}
            checkedState={changeCheckboxSaveMovies}
            requestKeyword={requestKeywordSaveMovies}
            isSaveMovies={isSaveMovies}
            isNotFoundMovies={notFoundMovies}
            isServerTextError={serverTextError}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            errorInfoText={errorInfoText}
            onSignOut={handleSignOut}
          />
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                handleRegister={handleRegister}
                errorMessage={errorInfoText}
              ></Register>
            )}
          </Route>
          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                handleLogin={handleLogin}
                errorMessage={errorInfoText}
              ></Login>
            )}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
