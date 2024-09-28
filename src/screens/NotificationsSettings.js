// NotificationsSettings.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Notificaciones</Text>
      {/* Aquí puedes agregar los elementos de configuración */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default NotificationsSettings;
