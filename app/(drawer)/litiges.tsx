import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';

export default function Litiges() {
  const [transactionId, setTransactionId] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
const [imageUri, setImageUri] = useState<string | null>(null);

const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission requise pour accéder à la galerie');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };



  const handleSubmit = () => {
    // Ici tu peux envoyer les données + imageUri vers ton backend
    Alert.alert('Litige soumis', 'Votre litige a été envoyé avec succès.');
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.heading}>Créer un litige</Text>
      <Text>Numero de la transaction</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 123456"
        value={transactionId}
        onChangeText={setTransactionId}
      />

      <Text>Titre du litige</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Produit endommagé"
        value={titre}
        onChangeText={setTitre}
      />

      <Text>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Décrivez avec detail qu est ce qui s est passer"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Soumettre le litige" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
});
