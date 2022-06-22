import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../actions';
import Header from '../components/Header';
import getAllCurrencies from '../services/fetchAPI';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const response = await getAllCurrencies();
    const currencies = Object.keys(response);
    const semUSD = currencies.filter((item) => item !== 'USDT');
    dispatch(fetchCurrenciesThunk(semUSD));
  }

  render() {
    return (
      <Header />
    );
  }
}

Wallet.propTypes = {
  allCurrencies: PropTypes.func,
}.isRequired;

// const mapDispatchToProps = (dispatch) => ({
//   allCurrencies: () => dispatch(getAllCurrencies()),
// });
export default connect()(Wallet);
