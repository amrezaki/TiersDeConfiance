// components/QuickActions.tsx

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuickActions() {
  const actions = [
    { icon: 'add-circle-outline', label: 'Nouvelle transaction', onPress: () => console.log('Nouvelle transaction') },
    { icon: 'shield-checkmark-outline', label: 'Déclarer un litige', onPress: () => console.log('Déclarer un litige') },
    { icon: 'receipt-outline', label: 'Mes transactions', onPress: () => console.log('Mes transactions') },
    { icon: 'people-outline', label: 'Bénéficiaires', onPress: () => console.log('Bénéficiaires') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions rapides</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <Ionicons name={action.icon as any} size={24} color="#28a745" />
            <Text style={styles.label}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#f2f4f7',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
});
