import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={ this.onButtonPress.bind(this) }>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={ this.onTextPress.bind(this) }>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={ () => this.setState({ showModal: !this.state.showModal }) }>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={ this.state.showModal }
          onAccept={ this.onAccept.bind(this) }
          onDecline={ this.onDecline.bine(this) }>
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }
}

EmployeeEdit.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  employee: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    shift: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired,
  employeeUpdate: PropTypes.func.isRequired,
  employeeSave: PropTypes.func.isRequired,
  employeeDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
