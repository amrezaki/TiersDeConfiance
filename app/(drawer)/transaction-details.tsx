// app/(drawer)/transaction-details.tsx

import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const API_URL = 'http://192.168.1.4:8082/api/transactions';

export default function TransactionDetails() {
  const { id } = useLocalSearchParams(); // 👈 récupère le paramètre ?id=123
  console.log("id recu:",id);
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransaction(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de la transaction', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.center}>
        <Text>Transaction introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails de la transaction</Text>
      <Text style={styles.label}>Titre :</Text>
      <Text style={styles.value}>{transaction.titre}</Text>

      <Text style={styles.label}>Montant :</Text>
      <Text style={styles.value}>{transaction.montant} FCFA</Text>

      <Text style={styles.label}>Statut :</Text>
      <Text style={styles.value}>{transaction.statut}</Text>

      <Text style={styles.label}>Date de création :</Text>
      <Text style={styles.value}>
        {new Date(transaction.dateCreation).toLocaleString()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});