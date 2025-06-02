import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Menu</Text>

          <DrawerItem
            label="Accueil"
            icon={({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}
            onPress={() => router.push('/dashboard')}
          />

          <DrawerItem
            label="Profil"
            icon={({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />}
            onPress={() => router.push('/profile')}
          />


          <DrawerItem
            label="Support"
            icon={({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />}
            onPress={() => router.push('/support')}
          />
          <DrawerItem
            label="Paramètres"
            icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
            onPress={() => router.push('/parametres')}
          />

          <DrawerItem
            label="Déconnexion"
            icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
            onPress={() => alert('Déconnecté')}
          />
        </View>
      </DrawerContentScrollView>

      {/* ✅ Bouton "Créer un litige" tout en bas */}
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#ccc' }}>
        <TouchableOpacity
          onPress={() => router.push('/litiges')}
          style={{
            backgroundColor: '#dc3545',
            padding: 12,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="alert-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Créer un litige</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}