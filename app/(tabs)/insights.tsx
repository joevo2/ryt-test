import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabTwoScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: useThemeColor({}, 'background') }}
    >
      <ThemedView style={styles.rootContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Transactions</ThemedText>
        </ThemedView>
        <ThemedText>
          Recipient (from contact list), selection/input, amount, and optional
          note,
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
