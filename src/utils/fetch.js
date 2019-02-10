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
