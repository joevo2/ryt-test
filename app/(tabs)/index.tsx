import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BalanceHeader from '@/components/balance-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [balance] = useState<number>(123456789);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: useThemeColor({}, 'background') }}
    >
      <ThemedView style={styles.rootContainer}>
        <BalanceHeader balance={balance} />
        <ThemedText>
          Display recent transfer history for quick re-sending
        </ThemedText>
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
