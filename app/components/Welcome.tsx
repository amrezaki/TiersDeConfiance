import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WelcomeProps {
  name: string;
}

export default function Welcome({ name }: WelcomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour, {name} 👋</Text>
      <Text style={styles.subText}>Voici un aperçu de vos activités</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
