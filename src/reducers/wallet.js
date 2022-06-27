import { FETCH_CURRENCIES_SUCCESS,
  ADD_EXPENSE, UPDATE_EXPENSES, EDIT_EXPENSE, CURR_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: true,
  idEditor: 0,
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
  case CURR_EXPENSE:
    console.log('set true');
    return { ...state,
      editor: false,
      idEditor: action.id };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      expenses: [
        ...state.expenses.map((currentExpense) => (currentExpense.id
        !== action.expense.id
          ? currentExpense : { ...currentExpense, ...action.expense })),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
