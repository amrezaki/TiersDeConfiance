// app/components/MenuDrawer.tsx
/* import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuDrawer({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        <TouchableOpacity onPress={() => { router.push("/litiges"); onClose(); }}>
          <Text style={styles.link}>Litiges</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push("/profile"); onClose(); }}>
          <Text style={styles.link}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push("/parametres"); onClose(); }}>
          <Text style={styles.link}>Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { console.log("Déconnexion"); onClose(); }}>
          <Text style={[styles.link, { color: "red" }]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.overlayClose} onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: "row",
    zIndex: 1000,
  },
  drawer: {
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  link: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  overlayClose: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});*/
