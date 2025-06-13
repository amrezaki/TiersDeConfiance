

import { useRouter } from 'expo-router';


import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import QuickActions from '../components/QuickActions';
import RecentTransactions from '../components/RecentTransactions';
import UserStats from '../components/UserStats';
import Welcome from '../components/Welcome';

type Transaction = {
  id: string;
  title: string;
  amount: number;
  status: 'en attente' | 'terminée' | 'litige';
  date: string;
};

// 🎨 Couleurs principales Zakipay
const PRIMARY_BLUE = '#007bff';
const PRIMARY_GREEN = '#00c853';
const LIGHT_BACKGROUND = '#f0fdf6';

export default function Dashboard() {
  const userName = 'killer';
  const router = useRouter();

  const [transactions] = useState<Transaction[]>([
    { id: '1', title: 'Achat de marchandise', amount: 200, status: 'terminée', date: '2025-05-15' },
    { id: '2', title: 'Service freelance', amount: 150, status: 'en attente', date: '2025-05-18' },
    { id: '3', title: 'Litige client', amount: 90, status: 'litige', date: '2025-05-19' },
  ]);

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <Welcome name={userName} />
            <UserStats />
            <QuickActions />
            <RecentTransactions />
            <Text style={styles.subtitle}>Historique des Transactions</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.transactionItem,
              {
                borderLeftColor:
                  item.status === 'terminée'
                    ? PRIMARY_GREEN
                    : item.status === 'en attente'
                    ? PRIMARY_BLUE
                    : '#e53935', // Rouge pour litige
              },
            ]}
          >
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionText}>Montant : {item.amount} FCFA</Text>
            <Text style={styles.transactionText}>Statut : {item.status}</Text>
            <Text style={styles.transactionText}>Date : {item.date}</Text>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

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
    backgroundColor: LIGHT_BACKGROUND,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: PRIMARY_BLUE,
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  transactionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  transactionText: {
    fontSize: 14,
    color: '#555',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: PRIMARY_BLUE,
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