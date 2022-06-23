import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
  }

  setantoState =() => {
    const total = this.calcExpenses();
    console.log(total);
  }

  calcExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((sum, item) => {
      const { value } = item;
      return sum + this.parseValue(value, item.exchangeRates[item.currency].ask);
    }, 0);
    return total;
  }

   parseValue = (value, cambioRate) => parseFloat(value) * parseFloat(cambioRate)

   render() {
     const { email } = this.props;
     const soma = parseFloat(this.calcExpenses()).toFixed(2);

     return (
       <header>
         <p data-testid="email-field">{email}</p>
         <p data-testid="total-field">{soma}</p>
         <p data-testid="header-currency-field">BRL</p>
       </header>
     );
   }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
