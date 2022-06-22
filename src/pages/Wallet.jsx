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
    console.log(currencies);
    dispatch(fetchCurrenciesThunk(currencies));
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
