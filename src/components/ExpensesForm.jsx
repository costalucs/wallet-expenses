import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesForm extends Component {
  render() {
    const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    return (
      <form>
        <input data-testid="value-input" type="number" />
        <input data-testid="description-input" type="text" />
        <label htmlFor="moedas">
          Moeda
          <select name="moedas" id="moedas">
            {currencies.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <label htmlFor="metodo">
          Metodo de pagamento
          <select data-testid="method-input" name="metodo" id="">
            {metodos.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <label htmlFor="despesas">
          Tipo de Desepesa
          <select data-testid="tag-input" name="despesas">
            {despesas.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;
export default connect(mapStateToProps)(ExpensesForm);
