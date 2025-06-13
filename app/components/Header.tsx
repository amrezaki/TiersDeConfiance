import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type RootDrawerParamList = {
  dashboard: undefined;
  profile: undefined;
  litiges: undefined;
  parametres: undefined;
};

export default function Header() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        
        {/* Menu hamburger */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.leftIcon}
        >
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>

        {/* Logo centré */}
         <TouchableOpacity onPress={() => router.push('/')}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        </TouchableOpacity>

        {/* Icônes à droite */}
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => router.push('/Notifications')} style={styles.icon}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    zIndex: 10,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    position: "relative",
  },
  leftIcon: {
    position: "absolute",
    left: 16,
    zIndex: 11,
  },
  rightIcons: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 11,
  },
  icon: {
    marginRight: 12,
  },
  logo: {
    width: 420,
    height: 70,
  },
});
