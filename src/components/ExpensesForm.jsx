import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class ExpensesForm extends Component {
  state ={
    id: 1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  }

  aletatoryID = () => Math.floor(Date.now() * Math.random())

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  handleClick = async () => {
    const { addExpenses } = this.props;
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await fetchAPI.json();
    const newid = this.aletatoryID();
    addExpenses({ ...this.state, currencies });
    this.setState((prev) => ({ id: prev.id + newid }));
  }

  render() {
    const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
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
        <label htmlFor="metodo">
          Metodo de pagamento
          <select
            data-testid="method-input"
            name="metodo"
            value={ method }
            id="method"
            onChange={ this.handleChange }
          >
            {metodos.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <label htmlFor="despesas">
          Tipo de Desepesa
          <select
            data-testid="tag-input"
            name="despesas"
            value={ tag }
            id="tag"
            onChange={ this.handleChange }
          >
            {despesas.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (payload) => dispatch(addExpense(payload)),
});
ExpensesForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
