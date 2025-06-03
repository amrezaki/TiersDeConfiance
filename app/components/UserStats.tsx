// components/UserStats.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UserStats() {
  const stats = [
    { icon: 'card-outline', label: 'Transactions', value: 12, color: '#007bff' },
    { icon: 'time-outline', label: 'En cours', value: 3, color: '#ffc107' },
    { icon: 'warning-outline', label: 'Litiges', value: 1, color: '#dc3545' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={[styles.card, { borderColor: stat.color }]}>
          <Ionicons name={stat.icon as any} size={26} color={stat.color} />
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
});
