export const fetchJson = (url, params) =>
  fetch(url, params).then(response => response.json());

export const fetching = (url, params) => () =>
  fetch(url, params).then(response => response.json());

export const prepareParams = (body, method = 'GET') => ({
  method,
  mode: 'cors',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});

export const prepareAuthParams = (body, method = 'GET') => ({
  method,
  mode: 'cors',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': window.localStorage.getItem('token')
  }
});

export const fetchRandomCocktail = fetching(`${process.env.REACT_APP_BACK}/cocktails/random`, prepareParams());
export const fetchAllCocktails = fetching(`${process.env.REACT_APP_BACK}/cocktails`, prepareParams());
export const fetchAllIngredients = fetching(`${process.env.REACT_APP_BACK}/ingredients`, prepareParams());
