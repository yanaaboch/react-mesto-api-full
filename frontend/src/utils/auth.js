export const BASE_URL = 'https://api.mesto.yanaaboch.nomoredomains.icu';

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

const headers = {
  Accept: 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
   // credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
   // credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
   // credentials: 'include',
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};