import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { emailInput } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  verifyBtn = () => {
    const min = 6;
    const { password } = this.state;
    return password.length >= min;
  }

  // referencia: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail = () => {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  activateButton = () => (this.verifyBtn() && this.validateEmail())

  toWallet = () => {
    const { saveEmail, history } = this.props;
    const { email } = this.state;
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <div className="form-floating">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
          >
            Email address
            <input
              type="email"
              data-testid="email-input"
              className="form-control"
              id="exampleInputEmail1"
              name="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
        </div>
        <div className="form-floating">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            <input
              type="password"
              data-testid="password-input"
              className="form-control"
              value={ password }
              id="exampleInputPassword1"
              onChange={ (e) => this.setState({ password: e.target.value }) }
            />
          </label>
        </div>
        <button
          disabled={ !this.activateButton() }
          type="submit"
          className="w-100 btn btn-lg btn-primary"
          onClick={ this.toWallet }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch(emailInput(payload)) });

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
