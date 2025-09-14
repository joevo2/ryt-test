import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';

export default function HomeScreen() {
  const [balance, setBalance] = useState<number>(0);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.rootContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            Account Balance {balance} icon button eyes to hide
          </ThemedText>
        </ThemedView>
        <ThemedText>Payment</ThemedText>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
