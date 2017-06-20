import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../actions';

class LoginForm extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={ this.onEmailChange.bind(this) }
            value={ this.props.email } />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={ this.onPasswordChange.bind(this) }
            value={ this.props.password } />
        </CardSection>
        <Text style={ styles.errorTextStyle }>
          { this.props.error }
        </Text>
        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } else {
      return (
        <Button onPress={ this.onButtonPress.bind(this) }>
          Login
        </Button>
      );
    }
  }
}

LoginForm.propTypes = {
  emailChanged: PropTypes.func.isRequired,
  passwordChanged: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,

  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { email, password, error, loading } = state.auth;
  return { email, password, error, loading };
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(LoginForm);
