// screens/DashboardScreen.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export default function DashboardScreen() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleLarge">Tableau de bord</Text>

      <Card style={{ marginVertical: 10 }}>
        <Card.Title title="Transactions en cours" />
        <Card.Content>
          <Text>Vous avez 3 transactions en cours.</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Voir</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginVertical: 10 }}>
        <Card.Title title="Notifications" />
        <Card.Content>
          <Text>Aucune nouvelle alerte.</Text>
        </Card.Content>
      </Card>

      <Card style={{ marginVertical: 10 }}>
        <Card.Title title="Historique" />
        <Card.Content>
          <Text>5 transactions terminées.</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Consulter</Button>
        </Card.Actions>
      </Card>

      <Button mode="contained" style={{ marginTop: 20 }}>
        Signaler un litige
      </Button>
    </ScrollView>
  );
}
