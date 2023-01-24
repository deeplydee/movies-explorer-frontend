class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {email: email, password: password} ),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addSavedMovie(movieData) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: movieData.id,
        nameRU: movieData.nameRU || 'Нет данных',
        nameEN: movieData.nameEN || 'Нет данных',
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  deleteSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.movies.deeplydee.nomoredomains.icu',
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://movies-explorer-api-coral.vercel.app',
});

export default mainApi;
