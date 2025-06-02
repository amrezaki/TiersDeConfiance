// app/(drawer)/confirmation.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        {type === 'litige' ? 'Litige soumis avec succès !' : 'Transaction créée avec succès !'}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 32 }}>
        Vous recevrez une notification dès que le statut sera mis à jour.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 8,
        }}
        onPress={() => router.push('/(drawer)/dashboard')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Retour à l’accueil</Text>
      </TouchableOpacity>
    </View>
  );
}
