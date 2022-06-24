import getAllCurrencies from '../services/fetchAPI';

// Coloque aqui suas actions
export const EMAIL_INPUT = 'EMAIL_INPUT';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const REQUEST = 'REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const emailInput = (payload) => ({
  type: EMAIL_INPUT,
  payload,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});

export function fetchCurrencies(currencies) {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    payload: currencies,
  };
}

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const response = await getAllCurrencies();
  dispatch(fetchCurrencies(response));
};
