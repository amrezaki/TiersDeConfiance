import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';

type Transaction = {
  id: string;
  title: string;
  amount: number;
  status: 'en attente' | 'terminée' | 'litige';
  date: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [transactions] = useState<Transaction[]>([
    { id: '1', title: 'Achat de marchandise', amount: 200, status: 'terminée', date: '2025-05-15' },
    { id: '2', title: 'Service freelance', amount: 150, status: 'en attente', date: '2025-05-18' },
    { id: '3', title: 'Litige client', amount: 90, status: 'litige', date: '2025-05-19' },
  ]);

  const total = transactions.length;
  const enLitige = transactions.filter(t => t.status === 'litige').length;
  const terminees = transactions.filter(t => t.status === 'terminée').length;
  const enAttente = transactions.filter(t => t.status === 'en attente').length;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Statistiques</Text>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{total}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Terminées</Text>
            <Text style={styles.statValue}>{terminees}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>En attente</Text>
            <Text style={styles.statValue}>{enAttente}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Litiges</Text>
            <Text style={styles.statValue}>{enLitige}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Historique Des Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionText}>Montant : {item.amount} fcfa</Text>
              <Text style={styles.transactionText}>Statut : {item.status}</Text>
              <Text style={styles.transactionText}>Date : {item.date}</Text>
            </View>
          )}
        />
      </View>

      {/* Bouton flottant pour créer une transaction */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/(drawer)/new-transaction')}
      >
        <Text style={styles.floatingButtonText}>Créer une transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statBox: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 4,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  transactionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  transactionText: {
    fontSize: 14,
    color: '#555',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
