export const fetchJson = (url, params) =>
  fetch(url, params)
    .then(response => response.json());

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

export const fetchRandomCocktail = fetching(`http://localhost:3300/cocktails/random`, prepareParams());
export const fetchAllCocktails = fetching(`http://localhost:3300/cocktails`, prepareParams());
