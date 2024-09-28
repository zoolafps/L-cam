// MainScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cameras = [
  { id: '1', name: 'Cámara 1', thumbnail: { uri: 'https://picsum.photos/id/1/300/200' } },
  { id: '2', name: 'Cámara 2', thumbnail: { uri: 'https://picsum.photos/id/2/300/200' } },
  { id: '3', name: 'Cámara 3', thumbnail: { uri: 'https://picsum.photos/id/3/300/200' } },
];

const MainScreen = ({ navigation }) => {
  const renderCameraItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cameraItem}
      onPress={() => navigation.navigate('CameraView', { cameraId: item.id, cameraThumbnail: item.thumbnail })}
      accessible={true}
      accessibilityLabel={`Ver ${item.name}`}
    >
      <Text style={styles.cameraText}>{item.name}</Text>
      <Image
        style={styles.CameraImage}
        source={item.thumbnail}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido, Usuario!</Text>

      <FlatList
        data={cameras}
        renderItem={renderCameraItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cameraList}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} accessible={true} accessibilityLabel="Configuración">
          <Ionicons name="settings" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} accessible={true} accessibilityLabel="Inicio">
          <Ionicons name="home" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddCamera')} accessible={true} accessibilityLabel="Agregar Cámara">
          <Ionicons name="add-circle" size={30
          } />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 50,
    marginTop: 90,
    textAlign: 'center',
  },
  cameraList: {
    flexGrow: 1, // Asegura que la lista use todo el espacio disponible
  },
  cameraItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 18,
  },
  CameraImage: {
    width: 300,
    height: 200,
    marginTop: 10, // Espaciado adicional para mejorar la estética
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default MainScreen;
