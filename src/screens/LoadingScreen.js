import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LcamIcon from '../../assets/LCam-logo.png';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={LcamIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tinyLogo: {
    width: 140,
    height: 140,
  },
});

export default LoadingScreen;
