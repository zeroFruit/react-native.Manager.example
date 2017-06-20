import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const Spinner = props => {
  const { size } = props;

  return (
    <View style={ styles.spinnerStyle }>
      <ActivityIndicator size={ size } />
    </View>
  );
};

Spinner.propTypes = {
  size: PropTypes.string
};

Spinner.defaultProps = {
  size: 'large'
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
