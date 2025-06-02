import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default function NewTransaction() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleCreate = () => {
    if (!title || !amount || !prenom || !nom || !telephone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setTitle('');
    setAmount('');
    setPrenom('');
    setNom('');
    setTelephone('');

    router.push({
      pathname: '/(drawer)/confirmation',
      params: { type: 'transaction' },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        
          <Text style={styles.heading}>Nouvelle transaction</Text>

          <Text style={styles.label}>Titre de la transaction</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Paiement électricité"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Prénom du destinataire</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrer le prénom"
            value={prenom}
            onChangeText={setPrenom}
          />

          <Text style={styles.label}>Nom du destinataire</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrer le nom"
            value={nom}
            onChangeText={setNom}
          />

          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: +221770000000"
            value={telephone}
            keyboardType="phone-pad"
            onChangeText={setTelephone}
          />

          <Text style={styles.label}>Montant</Text>
          <TextInput
            style={styles.input}
            placeholder="Montant en Fcfa"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Créer la transaction</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06, // responsive horizontal padding
    paddingTop: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
