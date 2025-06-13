import { useRouter } from 'expo-router';
import AuthService from './services/AuthService';

import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('bouton presse')
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const userData = await AuthService.login(email, password);
      Alert.alert('Succès', `Bienvenue ${userData.nom || 'utilisateur'}`);
      router.push('/(drawer)/dashboard');
    } catch (error: any) {
      console.error('Erreur de connexion :', error);

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || '';

        if (status === 401) {
          Alert.alert('Échec de connexion', 'Email ou mot de passe incorrect.');
        } else if (status === 404) {
          Alert.alert('Utilisateur introuvable', 'Aucun compte ne correspond à cet email.');
        } else {
          Alert.alert('Erreur', message || 'Une erreur inconnue est survenue.');
        }
      } else {
        Alert.alert('Erreur réseau', "Impossible de se connecter au serveur.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f4f6f8' },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 20, borderColor: '#ddd', borderWidth: 1 },
  button: { backgroundColor: '#007bff', padding: 14, borderRadius: 50, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, color: '#007bff', textAlign: 'center' },
});