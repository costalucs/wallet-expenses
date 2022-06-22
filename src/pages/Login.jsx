import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailInput } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  verifyBtn() {
    const min = 6;
    const { password } = this.state;
    return password.length >= min;
  }

  // referencia: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail() {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  activateButton() {
    return (this.verifyBtn() && this.validateEmail());
  }

  render() {
    const { email, password } = this.state;
    const { saveEmail } = this.props;
    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />
        <input
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ (e) => this.setState({ password: e.target.value }) }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !this.activateButton() }
            onClick={ () => saveEmail(email) }
          >
            Entrar

          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch(emailInput(payload)) });
// const { history } = this.props;
// history.push('/carteira');

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);