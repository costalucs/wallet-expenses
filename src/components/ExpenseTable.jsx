import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpenseTable extends Component {
  render() {
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
      </div>
    );
  }
}

export default connect()(ExpenseTable);
