import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../actions';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  async componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = () => {
    const { allCurrencies } = this.props;
    return allCurrencies();
  }

  render() {
    return (
      <>
        <Header />
        <ExpensesForm />
      </>
    );
  }
}

Wallet.propTypes = {
  allCurrencies: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  allCurrencies: () => dispatch(fetchCurrenciesThunk()),
});
export default connect(null, mapDispatchToProps)(Wallet);
