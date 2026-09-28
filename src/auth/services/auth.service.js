import { apiRequest } from '../../services/api';

const TOKEN_KEY = 'accessToken';


/* =========================================
   LOGIN
========================================= */

async function login(email, password) {
  const data = await apiRequest(
    '/auth/login',
    {
      method: 'POST',

      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    }
  );

  if (data?.accessToken) {
    localStorage.setItem(
      TOKEN_KEY,
      data.accessToken
    );
  }

  return data;
}


/* =========================================
   REGISTER
========================================= */

async function register(
  firstName,
  lastName,
  email,
  password
) {
  const name =
    `${firstName.trim()} ${lastName.trim()}`;

  const data = await apiRequest(
    '/auth/register',
    {
      method: 'POST',

      body: JSON.stringify({
        name,
        email: email.trim(),
        password,
      }),
    }
  );

  return data;
}


/* =========================================
   LOGOUT
========================================= */

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}


/* =========================================
   GET TOKEN
========================================= */

function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}


/* =========================================
   IS AUTHENTICATED
========================================= */

function isAuthenticated() {
  return Boolean(getAccessToken());
}


export {
  login,
  register,
  logout,
  getAccessToken,
  isAuthenticated,
};