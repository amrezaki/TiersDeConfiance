import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Transaction = {
  id: number | string;
  titre: string;
  montant: number;
  statut: string;
  dateCreation: string;
};

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succès':
      case 'success':
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dernières transactions</Text>

      <FlatList
        data={transactions.slice(0, 3)}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          
        
            <View style={styles.item}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.titre || '—'}</Text>
                <Text style={styles.date}>
                  {item.dateCreation
                    ? new Date(item.dateCreation).toLocaleDateString()
                    : 'Date inconnue'}
                </Text>
              </View>

              <View style={styles.right}>
                <Text style={styles.amount}>
                  {(item.montant ?? 0).toLocaleString()} FCFA
                </Text>
                <View style={styles.status}>
                  <Ionicons
                    name="ellipse"
                    size={12}
                    color={getStatusColor(item.statut)}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{ color: getStatusColor(item.statut), fontWeight: 'bold' }}>
                    {item.statut}
                  </Text>
                </View>
              </View>
            </View>
          
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/transactions')}>
        <Text style={styles.buttonText}>Voir toutes les transactions</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  info: {
    flex: 1,
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
    justifyContent: 'center',
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
  button: {
    marginTop: 16,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});