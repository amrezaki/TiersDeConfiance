// services/AuthService.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.9:8082/api/auth'; // ← remplace ici par ton IP

const login = async (email: string, password: string) => {
  try {
    console.log("Tentative de login:", email);
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    const token = response.data.token;
    await SecureStore.setItemAsync('token', token);
    console.log("Connexion réussie. Token stocké.");
    
    return response.data;
  } catch (error: any) {
    console.error("Erreur de login:", error?.response?.data || error.message);
    throw error;
  }
};

export default {
  login,
};