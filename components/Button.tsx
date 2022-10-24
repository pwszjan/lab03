import React, {useState} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {btn} from '../types/btn';

const Button = (props: btn) => {
  const [orientation, setOrientation] = useState('portrait');

  const onPress = (el: btn) => {
    DeviceEventEmitter.emit('emmitClick', el);
  };

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  return (
    <View
      style={[
        styles.wrapper,
        orientation === 'landscape' && styles.wrapperLandscape,
        props.type === 'arithmetic' && styles.orange,
        props.type === 'functional' && styles.graylight,
        props.children === '0' && styles.stretch,
        props.isActive && styles.orangeActive,
      ]}>
      <TouchableOpacity onPress={() => onPress(props)} style={styles.touchable}>
        <Text
          style={[
            styles.btn,
            orientation === 'portrait' ? styles.btn : styles.btnLandscape,
          ]}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 85,
    height: 85,
    backgroundColor: '#454547',
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: '#454547',
    overflow: 'hidden',
    marginTop: 18,
  },

  wrapperLandscape: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginTop: 10,
    marginLeft: 5,
  },

  touchable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  btn: {
    color: 'white',
    fontSize: 30,
  },

  btnLandscape: {
    fontSize: 20,
  },

  orange: {
    backgroundColor: '#F2A23A',
  },

  orangeActive: {
    backgroundColor: '#C06D00',
  },

  graylight: {
    backgroundColor: '#CDCDCD',
  },

  stretch: {
    width: 120,
  },
});

export default Button;
