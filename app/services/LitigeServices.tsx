import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.4:8082/api/litiges/creer';

export const createLitige = async (data: {
  transactionReference: string;
  titre: string;
  description: string;
  imageUri?: string;
}) => {
  const token = await SecureStore.getItemAsync('token');

  const formData = new FormData();
  formData.append('transactionReference', data.transactionReference);
  formData.append('titre', data.titre);
  formData.append('description', data.description);

  if (data.imageUri) {
    const filename = data.imageUri.split('/').pop()!;
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('image', {
      uri: data.imageUri,
      name: filename,
      type,
    } as any);
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Transaction introuvable. Vérifiez la référence.");
      } else if (error.response?.status === 403) {
        throw new Error("Transaction introuvable. Vérifiez la référence.");
      } else {
        throw new Error("Une erreur est survenue. Veuillez réessayer.");
      }
    } else {
      throw new Error("Erreur inconnue");
    }
  }
};