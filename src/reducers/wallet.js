import { FETCH_CURRENCIES_SUCCESS,
  ADD_EXPENSE, UPDATE_EXPENSES, EDIT_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { expense } = action;
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return { ...state,
      currencies: [...action.payload] };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, expense] };
  case UPDATE_EXPENSES:
    return { ...state, expenses: action.expenses };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: [
        ...state.expenses.filter((currentExpense) => currentExpense.id
        !== action.expense.id),
        action.expense,
      ].sort((expA, expB) => expA.id - expB.id),
    };
  default:
    return state;
  }
};

export default wallet;
