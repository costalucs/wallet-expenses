import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editingExpense, updateExpenses } from '../actions';
import parseValue from '../services/parseValue';

class ExpenseTable extends Component {
  deleteExpense = (expenseId) => {
    const { expenses, updateExpense } = this.props;
    const expensesUpdated = expenses.filter((expense) => expense.id !== expenseId);
    return updateExpense(expensesUpdated);
  }

  handleEdit =(id) => {
    const { expenses, editExpense } = this.props;
    const expenseSearch = expenses.filter((item) => id === item.id);
    console.log(expenseSearch);
    editExpense(expenseSearch);
    // editExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        {expenses.map((item, index) => (
          <tr key={ index }>
            <td>{item.description}</td>
            <td>{item.tag}</td>
            <td>{item.method}</td>
            <td>{parseFloat(item.value).toFixed(2)}</td>
            <td>{item.exchangeRates[item.currency].name}</td>
            <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
            <td>
              {parseFloat(parseValue(item.value, item.exchangeRates[item.currency].ask))
                .toFixed(2)}

            </td>
            <td>Real</td>
            <td>

              <button
                data-testid="edit-btn"
                type="button"
                onClick={ () => this.handleEdit(item.id) }
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => this.deleteExpense(item.id) }
              >
                Apagar

              </button>

            </td>
          </tr>
        ))}
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  updateExpense: (payload) => dispatch(updateExpenses(payload)),
  editExpense: (payload) => dispatch(editingExpense(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
