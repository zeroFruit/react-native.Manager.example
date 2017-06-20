import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={ this.onRowPress.bind(this) }>
        <View>
          <CardSection>
            <Text style={ styles.titleStyle }>
              { name }
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }
}

ListItem.propTypes = {
  employee: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
