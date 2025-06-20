// app/(drawer)/transactions.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import { getAllTransactions } from '../services/transactionService';

type Transaction = {
  id: number;
  titre: string;
  montant: number;
  statut: string;
  dateCreation: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Erreur chargement transactions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succès':
        return '#28a745';
      case 'en attente':
      case 'en_attente':
        return '#ffc107';
      case 'litige':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
       <Header />
      <Text style={styles.title}>Mes transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `key-${index}`)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/transaction/${item.id}`)} // Pour vue détaillée
          >
            <View>
              <Text style={styles.name}>{item.titre}</Text>
              <Text style={styles.date}>
                {new Date(item.dateCreation).toLocaleDateString()}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amount}>{item.montant.toLocaleString()} FCFA</Text>
              <Text style={[styles.status, { color: getStatusColor(item.statut) }]}>
                {item.statut}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f0fdf6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
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
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    color: '#777',
    fontSize: 12,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
    marginTop: 4,
  },
});