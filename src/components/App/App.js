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
} from '../../utils/constants';

function App() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorInfoText, setErrorInfoText] = useState();
  const [allBeatFilmMovies, setAllBeatFilmMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [foundMoviesParams, setFoundMoviesParams] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [filterSaveMovies, setFilterSaveMovies] = useState(saveMovies);
  const [requestKeyword, setRequestKeyword] = useState('');
  const [changeCheckbox, setChangeCheckbox] = useState(false);
  const [requestKeywordSaveMovies, setRequestKeywordSaveMovies] = useState('');
  const [changeCheckboxSaveMovies, setChangeCheckboxSaveMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [serverTextError, setServerErrorMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      handleGetInfo();
      setLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    handleGetInfo();
    setRequestKeyword(localStorage.getItem('requestKeyword' || ''));
    // setRequestKeyword(localStorage.getItem('requestKeywordSaveMovies' || ''));
    setRequestKeywordSaveMovies(localStorage.getItem('requestKeywordSaveMovies' || ''));

    setChangeCheckbox(localStorage.getItem('changeCheckbox' || '') === 'true');
    setChangeCheckboxSaveMovies(localStorage.getItem('changeCheckboxSaveMovies') === 'true');

    if (JSON.parse(localStorage.getItem('foundMoviesParams'))) {
      setMovies(JSON.parse(localStorage.getItem('foundMoviesParams')));
    }
  }, []);

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
        // const { email, name, _id } = data.data;
        const { email, name, _id } = data;
        setCurrentUser({ email, name, _id });
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', true);
          return true;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    mainApi
      .getSavedMovies()
      .then((data) => {
        setLoggedIn(true);
        setSaveMovies(data);
      })
      .catch((err) => {
        console.log(err);
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

  const handleSearchMovies = (keyword) => {
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

  const handleSearchSubmitSavePage = (searchRequest) => {
    // localStorage.setItem('requestKeywordSaveMovies', searchRequest);
    localStorage.setItem('changeCheckboxSaveMovies', changeCheckboxSaveMovies);
    const moviesData = searchMoviesKeyword(
      saveMovies,
      searchRequest,
      changeCheckboxSaveMovies
    );
    // setRequestKeywordSaveMovies(searchRequest);
    if (moviesData.length === 0) {
      setNotFoundMovies(true);
      setSaveMovies(moviesData);
    } else {
      setNotFoundMovies(false);
      setFilterSaveMovies(moviesData);
      setSaveMovies(moviesData);
    }
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .addSavedMovie(movie)
      .then((addMovie) => {
        setSaveMovies([addMovie, ...saveMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteSavedMovie(movie._id)
      .then((movie) => {
        const updateSaveMovies = saveMovies.filter((i) => movie._id !== i._id);
        localStorage.setItem('saveMovies', updateSaveMovies);
        setSaveMovies(updateSaveMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isSaveMovies = (movie) => {
    return saveMovies.some(
      (i) => i.movieId === movie.id && i.owner === currentUser._id
    );
  };

  const handleSearchMoviesParams = (movies, keyword, checkbox) => {
    const moviesData = searchMoviesKeyword(movies, keyword, false);
    if (moviesData.length === 0) {
      setNotFoundMovies(true);
    } else {
      setNotFoundMovies(false);
    }
    setMovies(moviesData);
    setFoundMoviesParams(checkbox ? searchShortFilms(moviesData) : moviesData);
    localStorage.setItem('foundMoviesParams', JSON.stringify(moviesData));
  };

  const handleShortFilmsSaveMovies = () => {
    if (!changeCheckboxSaveMovies) {
      setChangeCheckboxSaveMovies(true);
      // localStorage.setItem('changeCheckboxSaveMovies', true);
      setSaveMovies(searchShortFilms(filterSaveMovies));
      searchShortFilms(filterSaveMovies).length === 0
        ? setNotFoundMovies(true)
        : setNotFoundMovies(false);
    } else {
      setChangeCheckboxSaveMovies(false);
      // localStorage.setItem('changeCheckboxSaveMovies', false);
      filterSaveMovies.length === 0
        ? setNotFoundMovies(true)
        : setNotFoundMovies(false);
      setSaveMovies(filterSaveMovies);
    }
  };

  const searchShortFilms = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  const handleChangeCheckboxState = () => {
    setChangeCheckbox(!changeCheckbox);
    if (!changeCheckbox) {
      setMovies(searchShortFilms(foundMoviesParams));
      if (foundMoviesParams.length === 0) {
        setNotFoundMovies(true);
        setTimeout(() => {
          setNotFoundMovies(false);
        }, 2000);
      }
    } else {
      setMovies(foundMoviesParams);
      // setNotFoundMovies(false);
    }
    localStorage.setItem('changeCheckbox', !changeCheckbox);
  };

  const searchMoviesKeyword = (movies, keyword, checkbox) => {
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
