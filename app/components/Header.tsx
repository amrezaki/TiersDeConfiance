import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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

        {/* Titre centré */}
        <Text style={styles.title}>Dashboard</Text>

        {/* Icônes à droite */}
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => console.log("Notifications")} style={styles.icon}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Profil")}>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
