// CameraView.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CameraView = ({ route }) => {
  const { cameraId, cameraThumbnail } = route.params; // Cambié "CameraThumbnail" a "cameraThumbnail"

  return (
    <View style={styles.container}>
      <Image
        style={styles.CameraImage}
        source={cameraThumbnail} // Aquí se pasa directamente
      />
      <Text style={styles.text}>Visualizando Cámara: {cameraId}</Text>
      {/* Aquí puedes integrar la lógica para mostrar el streaming de la cámara */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  CameraImage: {
    width: 300,
    height: 200,
  },
  text: {
    fontSize: 24,
  },
});

export default CameraView;
