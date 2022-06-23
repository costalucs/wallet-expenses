import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesForm extends Component {
  state ={
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          data-testid="description-input"
          type="text"
          value={ description }
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
        <label htmlFor="moedas">
          Moeda
          <select
            name="moedas"
            id="moedas"
            value={ currency }
            onChange={ (e) => this.setState({ currency: e.target.value }) }
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
            onChange={ (e) => this.setState({ method: e.target.value }) }
            id=""
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
            onChange={ (e) => this.setState({ tag: e.target.value }) }
          >
            {despesas.map((item, key) => (
              <option key={ key } value={ item }>{item}</option>)) }
          </select>
        </label>
        <button type="button">Adicionar despesa</button>
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
