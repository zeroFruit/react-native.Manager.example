import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  render() {
    return (
      <Card>
        <EmployeeForm { ...this.props } />

        <CardSection>
          <Button onPress={ this.onButtonPress.bind(this) }>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' }); // '' || 'Monday' => 'Monday'
  }
}

EmployeeCreate.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  employeeCreate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeCreate })(EmployeeCreate);
