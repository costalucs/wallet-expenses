// Coloque aqui suas actions
export const EMAIL_INPUT = 'EMAIL_INPUT';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const REQUEST = 'REQUEST';

export const emailInput = (payload) => ({
  type: EMAIL_INPUT,
  payload,
});

export function fetchCurrenciesThunk(currencies) {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    payload: currencies,
  };
}

// export const fetchCurrenciesThunk = () => (dispatch) => {
//   getAllCurrencies().then((resp) => {
//     dispatch(getCurrencies(resp));
//   });
// };
