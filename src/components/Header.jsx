import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import parseValue from '../services/parseValue';

class Header extends Component {
  state = {
  }

   calcExpenses = () => {
     const { expenses } = this.props;
     const total = expenses.reduce((sum, item) => {
       const { value } = item;
       return sum + parseValue(value, item.exchangeRates[item.currency].ask);
     }, 0);
     return parseFloat(total).toFixed(2);
   }

   render() {
     const { email } = this.props;

     return (
       <header>
         <p data-testid="email-field">{email}</p>
         <p data-testid="header-currency-field">
           BRL
           {' '}
           <span data-testid="total-field">
             {this.calcExpenses()}
           </span>
         </p>
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
