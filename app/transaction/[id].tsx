// app/transactions/[id].tsx
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getTransaction = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(`http://192.168.1.4:8082/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de charger la transaction.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.center}>
        <Text>Aucune transaction trouvée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la transaction</Text>

      <Text style={styles.label}>Titre :</Text>
      <Text style={styles.value}>{transaction.titre}</Text>

      <Text style={styles.label}>Montant :</Text>
      <Text style={styles.value}>{transaction.montant.toLocaleString()} FCFA</Text>

      <Text style={styles.label}>Statut :</Text>
      <Text style={styles.value}>{transaction.statut}</Text>

      <Text style={styles.label}>Date :</Text>
      <Text style={styles.value}>{new Date(transaction.dateCreation).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
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
    color: '#333',
  },
});