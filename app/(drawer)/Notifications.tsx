import { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

export default function Notifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [transactionNotif, setTransactionNotif] = useState(true);
  const [litigeNotif, setLitigeNotif] = useState(true);
  const [reminderNotif, setReminderNotif] = useState(false);

  const testNotification = () => {
    Alert.alert("Notification test", "Ceci est une notification de test !");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Activer les notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>

        {notificationsEnabled && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Notifications de transaction</Text>
              <Switch value={transactionNotif} onValueChange={setTransactionNotif} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Notifications de litige</Text>
              <Switch value={litigeNotif} onValueChange={setLitigeNotif} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Rappels automatiques</Text>
              <Switch value={reminderNotif} onValueChange={setReminderNotif} />
            </View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.testButton} onPress={testNotification}>
        <Text style={styles.testButtonText}>Tester une notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  testButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});