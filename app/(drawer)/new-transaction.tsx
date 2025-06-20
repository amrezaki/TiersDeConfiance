// app/(drawer)/new-transaction.tsx
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
  View,
} from 'react-native';
import Header from '../components/Header';
import { creerTransaction } from '../services/transactionService'; // <-- ✅ Ajout

const { width } = Dimensions.get('window');

export default function NewTransaction() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleCreate = async () => {
    if (!title || !amount || !prenom || !nom || !telephone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const data = {
      titre: title,
      montant: parseFloat(amount),
      prenomVendeur: prenom,
      nomVendeur: nom,
      telephoneVendeur: '+221' + telephone,
    };

    try {
      const transaction = await creerTransaction(data);

      Alert.alert('Succès', `Transaction créée avec succès\nRéférence : ${transaction.reference}`);

      setTitle('');
      setAmount('');
      setPrenom('');
      setNom('');
      setTelephone('');

      router.push({
        pathname: '/(drawer)/confirmation',
        params: { type: 'transaction',reference:transaction.reference },
      });
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erreur', error.message || 'Une erreur est survenue');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <View style={styles.container}>
          <Text style={styles.heading}>Nouvelle transaction</Text>

          <Input label="Titre" placeholder="Ex: Paiement facture" value={title} onChange={setTitle} />
          <Input label="Prénom du vendeur" placeholder="Ex: Aliou" value={prenom} onChange={setPrenom} />
          <Input label="Nom du vendeur" placeholder="Ex: Diop" value={nom} onChange={setNom} />

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.prefix}>+221</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="770000000"
                value={telephone}
                keyboardType="phone-pad"
                onChangeText={setTelephone}
                maxLength={9}
              />
            </View>
          </View>

          <Input
            label="Montant"
            placeholder="Ex: 5000"
            value={amount}
            onChange={setAmount}
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

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

function Input({ label, placeholder, value, onChange, keyboardType = 'default' }: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: 30,
    paddingBottom: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  prefix: {
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
});