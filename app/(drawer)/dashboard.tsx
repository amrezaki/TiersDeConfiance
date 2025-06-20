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

import * as SecureStore from 'expo-secure-store';
import Header from '../components/Header';
import QuickActions from '../components/QuickActions';
import RecentTransactions from '../components/RecentTransactions';
import UserStats from '../components/UserStats';
import Welcome from '../components/Welcome';
import { getAllTransactions } from '../services/transactionService';

const PRIMARY_BLUE = '#007bff';
const LIGHT_BACKGROUND = '#f0fdf6';

type Transaction = {
  id: number;
  titre: string;
  montant: number;
  statut: string;
  dateCreation: string;
};

export default function Dashboard() {
  const userName = 'killer';
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTokenAndFetchTransactions = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
          console.warn('Token non trouvé, redirection...');
          router.replace('/'); // rediriger vers la page de connexion
          return;
        }

        const data = await getAllTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Erreur de chargement des transactions :', err);
      } finally {
        setLoading(false);
      }
    };

    checkTokenAndFetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY_BLUE} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={[]} // pas d’éléments ici
          ListHeaderComponent={
            <View>
              <Welcome name={userName} />
              <UserStats />
              <QuickActions />
              <RecentTransactions transactions={transactions} />
            </View>
          }
          renderItem={null}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      )}

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