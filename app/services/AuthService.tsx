import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.4:8082/api/auth'; // ← Remplace avec ton IP locale correcte

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

const register = async (fullName: string, email: string, password: string) => {
  try {
    console.log("Tentative d'inscription:", email);
    const response = await axios.post(`${API_URL}/register`, {
      fullName,
      email,
      password,
    });

    const token = response.data.token;
    await SecureStore.setItemAsync('token', token);
    console.log("Inscription réussie. Token stocké.");

    return response.data;
  } catch (error: any) {
    console.error("Erreur d'inscription:", error?.response?.data || error.message);
    throw error;
  }
};

export default {
  login,
  register,
};

export const logout = async () => {
  await SecureStore.deleteItemAsync('token');
};