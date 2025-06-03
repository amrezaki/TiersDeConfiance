import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Transaction = {
  id: string;
  beneficiaire: string;
  montant: number;
  statut: 'succès' | 'en attente' | 'litige';
  date: string;
};

const transactions: Transaction[] = [
  {
    id: '1',
    beneficiaire: 'Fatou Ndiaye',
    montant: 25000,
    statut: 'succès',
    date: '2025-06-01',
  },
  {
    id: '2',
    beneficiaire: 'Alioune Ba',
    montant: 15000,
    statut: 'en attente',
    date: '2025-05-31',
  },
  {
    id: '3',
    beneficiaire: 'Moussa Diop',
    montant: 30000,
    statut: 'litige',
    date: '2025-05-29',
  },
];

export default function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succès':
        return '#28a745';
      case 'en attente':
        return '#ffc107';
      case 'litige':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dernières transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.beneficiaire}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.amount}>{item.montant.toLocaleString()} FCFA</Text>
              <View style={styles.status}>
                <Ionicons name="ellipse" size={12} color={getStatusColor(item.statut)} style={{ marginRight: 4 }} />
                <Text style={{ color: getStatusColor(item.statut), fontWeight: 'bold' }}>{item.statut}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  info: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    color: '#777',
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
