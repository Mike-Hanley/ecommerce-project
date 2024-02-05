// auth.js

const TOKEN_KEY = 'token';

export const login = async (username, password) => {
  const response = await fetch('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    return true;
  } else {
    throw new Error('Invalid username or password');
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
