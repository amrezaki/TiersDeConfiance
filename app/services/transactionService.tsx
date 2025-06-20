// app/services/transactionService.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.4:8082/api/transactions'; // adapte si besoin

export const creerTransaction = async (transactionData: any) => {
  const token = await SecureStore.getItemAsync('token');
  console.log('Token récupéré:', token);

  if (!token) {
    throw new Error('Token introuvable');
  }

  const response = await axios.post(`${API_URL}/creer`, transactionData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
export const getAllTransactions  = async () => {
  const token = await SecureStore.getItemAsync('token');

  if (!token) {
    throw new Error('Token introuvable');
  }

  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getTransactionById = async (id: string) => {
  const token = await SecureStore.getItemAsync('token');
  if (!token) throw new Error('Token introuvable');

  const response = await axios.get(`http://192.168.1.4:8082/api/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};