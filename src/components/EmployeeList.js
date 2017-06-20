import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import PropTypes from 'prop-types';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={ this.dataSource }
        renderRow={ this.renderRow } />
    );
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={ employee } />;
  }
}

EmployeeList.propTypes = {
  employeesFetch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => ({ ...val, uid }));

  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
