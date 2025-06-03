import { Text, View } from 'react-native';
import Header from '../components/Header';
export default function Profile() {
  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header></Header>
      <Text>👤 Profil utilisateur</Text>
    </View>
  );
}
