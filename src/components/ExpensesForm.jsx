import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class ExpensesForm extends Component {
  state ={
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: '',
    description: '',
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  // calcExpenses = () => {
  //   const { expenses } = this.props;
  //   const total = expenses.reduce((sum, item) => {
  //     const { value } = item;
  //     // console.log(item.currencies[item.currency]);
  //     return sum + this.parseValue(value, item.exchangeRates[item.currency].ask);
  //   }, 0);
  //   return total;
  // }

  parseValue = (value, cambioRate) => parseFloat(value) * parseFloat(cambioRate)

  handleClick = async () => {
    const { addExpenses } = this.props;
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await fetchAPI.json();
    delete currencies.DOGE;
    addExpenses({ ...this.state, exchangeRates: { ...currencies } });
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '' }));
    // this.calcExpenses();
  }

  render() {
    // const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    // const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    // const total = expenses
    //   .forEach((item) => console.log(item.expenses[/item.currency/i]));
    const { value, description, currency, method, tag } = this.state;
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
            {/* {metodos.map((item, index) => (
              <option key={ index } value={ item }>{item}</option>)) } */}
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
            {/* {despesas.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) } */}
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (payload) => dispatch(addExpense(payload)),
});
ExpensesForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
