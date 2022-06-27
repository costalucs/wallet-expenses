import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, editingExpense } from '../actions';

class ExpensesForm extends Component {
  state ={
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Cartão de débito',
    tag: '',
    description: '',
  }

  componentDidUpdate() {
    this.verifyEditor();
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  parseValue = (value, cambioRate) => parseFloat(value) * parseFloat(cambioRate)

  handleClick = async () => {
    const { addExpenses } = this.props;
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await fetchAPI.json();
    addExpenses({ ...this.state, exchangeRates: { ...currencies } });
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '' }));
  }

  handleEdit = (state) => {
    const { editExpense } = this.props;
    editExpense(state);
  }

  verifyEditor = () => {
    const { editor } = this.props;
    return editor;
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: 0,
      value,
      currency,
      method,
      tag,
      description,
    };
    return (
      <form>
        <input
          data-testid="value-input"
          type="number"
          value={ value }
          id="value"
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          value={ description }
          id="description"
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            id="method"
            required
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tipo de Desepesa
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            id="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {this.verifyEditor() ? (
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>)
          : (
            <button
              type="button"
              onClick={ () => this.handleEdit(expense) }
            >
              Editar despesa
            </button>)}
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idEditr: state.wallet.idEditor,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (payload) => dispatch(addExpense(payload)),
  editExpense: (payload) => dispatch(editingExpense(payload)),
});
ExpensesForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
