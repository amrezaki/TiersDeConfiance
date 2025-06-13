// app/(drawer)/profil.tsx

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

const user = {
  name: 'Aliou Diatta',
  email: 'aliou@example.com',
  phone: '+221 77 123 45 67',
  role: 'Utilisateur',
  avatar: 'https://i.pravatar.cc/150?img=3', // avatar mock
};

export default function Profil() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Mon Profil</Text>

      <View style={styles.profileContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>Email : {user.email}</Text>
        <Text style={styles.info}>Téléphone : {user.phone}</Text>
        <Text style={styles.info}>Rôle : {user.role}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Modifier mon profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});