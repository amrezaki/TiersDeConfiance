import React, { useState } from 'react';
import { Alert, Button, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

export default function Support() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!nom || !email || !message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    Alert.alert('Message envoyé', 'Merci de nous avoir contactés.');
    setNom('');
    setEmail('');
    setMessage('');
  };

  const openWhatsApp = () => {
    const phoneNumber = '+221777064364'; // Remplace par ton numéro
    const url = `https://wa.me/${phoneNumber.replace('+', '')}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erreur', 'Impossible d’ouvrir WhatsApp');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header></Header>
      <Text style={styles.heading}>Support</Text>
      <Text style={styles.intro}>
        Vous avez une question ou un problème ? Envoyez-nous un message et nous vous répondrons rapidement.
      </Text>

      <TextInput
        placeholder="Votre nom"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        placeholder="Votre email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Votre message"
        style={[styles.input, { height: 120 }]}
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Envoyer" onPress={handleSubmit} />

      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
        <Text style={styles.whatsappText}>📱 Contacter sur WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  intro: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  whatsappButton: {
    marginTop: 24,
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  whatsappText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
