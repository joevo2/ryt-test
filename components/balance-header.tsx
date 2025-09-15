import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import SendModal from '@/components/send-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type BalanceHeaderProps = {
  balance: number;
};

const BalanceHeader: React.FC<BalanceHeaderProps> = ({ balance }) => {
  const router = useRouter();

  const [hidden, setHidden] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="subtitle">Account Balance</ThemedText>
      <ThemedView style={styles.balanceContainer}>
        <ThemedText style={styles.balanceText}>
          {hidden ? '••••••' : `MYR ${balance.toLocaleString()}`}
        </ThemedText>
        <Ionicons
          name={hidden ? 'eye-outline' : 'eye-off-outline'}
          size={24}
          color="gray"
          onPress={() => setHidden((h) => !h)}
          style={{ marginLeft: 8 }}
        />
      </ThemedView>
      <ThemedView style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Ionicons name={'arrow-forward'} size={42} color="white" />
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert('Camera action not implemented yet');
          }}
        >
          <Ionicons name={'camera-outline'} size={42} color="white" />
          <Text style={{ color: 'white' }}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.navigate('/insights');
          }}
        >
          <Ionicons name={'receipt'} size={38} color="white" />
          <Text style={{ color: 'white' }}>Insights</Text>
        </TouchableOpacity>
      </ThemedView>
      <SendModal visible={modalVisible} setModalVisible={setModalVisible} />
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
    backgroundColor: '#ecf7ffff',
  },
  balanceContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2600ffff',
    color: 'white',
  },
});

export default BalanceHeader;
