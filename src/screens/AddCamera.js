import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { NativeEventEmitter } from 'react-native';
import RNFS from 'react-native-fs';

const AddCamera = ({ manager }) => {
  const [devices, setDevices] = useState([]);
  const [bleManagerEmitter, setBleManagerEmitter] = useState(null);

  // Solicitar permisos para acceso a Bluetooth y almacenamiento
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ];
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      return permissions.every(perm => granted[perm] === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true; // Asumimos que en iOS los permisos están concedidos
  };

  const handleDiscoverPeripheral = useCallback((peripheral) => {
    if (peripheral.name) {
      setDevices(prev => [...prev, peripheral]);
    }
  }, []);

  useEffect(() => {
    if (manager) {
      const emitter = new NativeEventEmitter(manager);
      setBleManagerEmitter(emitter);

      const subscription = emitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

      return () => {
        subscription.remove();
      };
    }
  }, [manager, handleDiscoverPeripheral]);

  const scanDevices = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) {
      Alert.alert('Permisos denegados', 'Necesitas conceder permisos para usar esta función.');
      return;
    }
    
    setDevices([]);
    if (manager) {
      manager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
        })
        .catch(err => {
          console.error('Scan error:', err);
        });
    } else {
      console.error('Manager is undefined');
    }
  };

  const saveConfigToFile = async (config) => {
    const path = `${RNFS.DocumentDirectoryPath}/configDevice.json`;
    try {
      await RNFS.writeFile(path, JSON.stringify(config), 'utf8');
      console.log('Archivo guardado en:', path);
      Alert.alert('Archivo guardado', `Configuración guardada en: ${path}`);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      Alert.alert('Error', 'No se pudo guardar la configuración.');
    }
  };

  const linkDevice = (device) => {
    Alert.alert(
      'Dispositivo vinculado',
      `Has vinculado ${device.name}`,
      [
        {
          text: 'Guardar Configuración',
          onPress: () => {
            const config = {
              deviceName: device.name,
              // Aquí puedes agregar más campos como el nombre de la red y contraseña
            };
            saveConfigToFile(config);
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vincular Nueva Cámara</Text>
      <Button title="Buscar Dispositivos" onPress={scanDevices} />
      <FlatList
        data={devices}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.deviceItem} onPress={() => linkDevice(item)}>
            <Text>{item.name}</Text>
            <Button title="Vincular" onPress={() => linkDevice(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  deviceItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default AddCamera;
