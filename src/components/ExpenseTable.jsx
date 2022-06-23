import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import parseValue from '../services/parseValue';

class ExpenseTable extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
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
          </tr>
        ))}
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);
