import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import { createLitige } from '../services/LitigeServices';

export default function Litiges() {
  const [transactionReference, setTransactionReference] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission refusée', 'Autorisation nécessaire pour accéder à la galerie.');
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

  const handleSubmit = async () => {
    if (!transactionReference || !titre || !description) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    try {
      await createLitige({
        transactionReference: transactionReference.trim(), // si c'est une chaîne (sinon adapte)
        titre,
        description,
        imageUri: imageUri ?? undefined,
      });

      Alert.alert('Succès', 'Votre litige a été soumis avec succès.');
      setTransactionReference('');
      setTitre('');
      setDescription('');
      setImageUri(null);
    } catch (error:any) {

      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Créer un litige</Text>

        <Text style={styles.label}>Référence Transaction</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: KM9388D"
          value={transactionReference}
          onChangeText={setTransactionReference}
        />

        <Text style={styles.label}>Titre du litige</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Produit endommagé"
          value={titre}
          onChangeText={setTitre}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Décrivez ce qui s'est passé"
          value={description}
          onChangeText={setDescription}
        />

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>
            {imageUri ? 'Changer l’image' : 'Ajouter une image'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Soumettre le litige</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    fontSize: 15,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});