// app/(drawer)/_layout.tsx

import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import CustomDrawerContent from '../components/CustomDrawerContent';
const { Navigator } = createDrawerNavigator();

const Drawer = withLayoutContext(Navigator);

export default function DrawerLayout() {
  return (
    
    <Drawer
      screenOptions={{
        headerShown: false, // on utilise notre propre Header
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />
    
    }
    />
    
    
    
  );
}

export const unstable_settings = {
  initialRouteName: 'dashboard',
};
