import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BalanceHeader from '@/components/balance-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [balance] = useState<number>(123456789);
  const [contactName, setContactName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContactPicker() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setLoading(true);
      try {
        const existingContact = await Contacts.presentContactPickerAsync();
        if (existingContact) {
          const contact = await Contacts.getContactByIdAsync(
            existingContact.id
          );
          if (contact) {
            setContactName(contact.firstName || 'Unnamed');
            setContactPhone(contact.phoneNumbers?.[0]?.number ?? 'No phone');
            setLoading(false);
          }
          return;
        }
      } catch (err) {
        setContactName('Error fetching contacts');
        setContactPhone(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: useThemeColor({}, 'background') }}
    >
      <ThemedView style={styles.rootContainer}>
        <BalanceHeader balance={balance} />
        <ThemedText>Payment</ThemedText>
        <Button
          title={loading ? 'Looking...' : 'Pick contact'}
          onPress={handleContactPicker}
        />
        {contactName && (
          <ThemedView>
            <ThemedText type="defaultSemiBold">Selected contact</ThemedText>
            <ThemedText>Name: {contactName}</ThemedText>
            <ThemedText>Phone: {contactPhone}</ThemedText>
          </ThemedView>
        )}
        <ThemedText>
          Recipient (from contact list), selection/input, amount, and optional
          note,
        </ThemedText>
        <ThemedText>
          Display recent transfer history for quick re-sending
        </ThemedText>
        <ThemedText>Error Messages</ThemedText>
        <ThemedText>Biometric Authentication, fallback</ThemedText>
        <ThemedText>
          Simulate API calls for processing the transaction • Implement proper
          error handling for various scenarios (e.g. insufficient funds, network
          issues) • Display a confirmation screen with transaction details upon
          successful transfer
        </ThemedText>
        <ThemedText>
          Optimize rendering of lists • Implement efficient state management and
          minimize unnecessary re-renders
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    flexDirection: 'column',
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'red',
  },
});
