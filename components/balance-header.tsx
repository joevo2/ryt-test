import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

type BalanceHeaderProps = {
  balance: number;
};

const BalanceHeader: React.FC<BalanceHeaderProps> = ({ balance }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Main Account</ThemedText>
      <ThemedView style={styles.balanceContainer}>
        <ThemedText>{hidden ? '••••••' : balance}</ThemedText>
        <Ionicons
          name={hidden ? 'eye-outline' : 'eye-off-outline'}
          size={24}
          color="gray"
          onPress={() => setHidden((h) => !h)}
          style={{ marginLeft: 8 }}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderRadius: 12,
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
  },
  balanceContainer: {
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
});

export default BalanceHeader;
