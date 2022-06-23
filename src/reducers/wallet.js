import { FETCH_CURRENCIES_SUCCESS, ADD_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { expense } = action;
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return { ...state,
      currencies: [...action.payload] };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, expense] };
  default:
    return state;
  }
};

export default wallet;
