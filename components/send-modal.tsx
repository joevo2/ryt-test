import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useTransactions } from '../app/contexts';

const MALAYSIAN_BANKS = [
  'Maybank',
  'CIMB',
  'Public Bank',
  'RHB',
  'HSBC',
  'Ambank',
  'Bank Islam',
];

export default function SendModal({
  visible,
  setModalVisible,
}: {
  visible: boolean;
  setModalVisible: (v: boolean) => void;
}) {
  const router = useRouter();
  const { addTransaction } = useTransactions();

  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>(MALAYSIAN_BANKS[0]);
  const [showBankList, setShowBankList] = useState<boolean>(false);

  async function handleContactPicker() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      try {
        const existingContact = await Contacts.presentContactPickerAsync();
        if (existingContact) {
          const contact = await Contacts.getContactByIdAsync(
            existingContact.id
          );
          if (contact) {
            setRecipient(contact.firstName || 'Unnamed');
            setContactPhone(contact.phoneNumbers?.[0]?.number ?? 'No phone');
          }
          return;
        }
      } catch (err) {
        setRecipient('Error fetching contacts');
        setContactPhone(null);
        console.error(err);
      }
    }
  }

  const handleAddTransaction = () => {
    // validate
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert('Enter a valid amount');
      return;
    }
    if (!recipient) {
      Alert.alert('Enter a recipient or pick a contact');
      return;
    }

    const payload = {
      amount: amt,
      recipient,
      contactPhone,
      bank: selectedBank,
      note,
    };

    if (!recipient || !amount || isNaN(Number(amount))) return;

    addTransaction({
      title: 'Transfer to ' + recipient,
      subtitle: `Sent to ${selectedBank}\n${note}`,
      amount: amt,
    });

    Alert.alert('Transaction Added', JSON.stringify(payload));
    setModalVisible(false);
    setAmount('');
    setRecipient('');
    setContactPhone(null);
    setNote('');
    setSelectedBank(MALAYSIAN_BANKS[0]);
    setShowBankList(false);

    router.navigate('/insights');
  };

  const onExit = () => {
    setModalVisible(false);
    setAmount('');
    setRecipient('');
    setContactPhone(null);
    setNote('');
    setSelectedBank(MALAYSIAN_BANKS[0]);
    setShowBankList(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
      allowSwipeDismissal
      onRequestClose={onExit}
    >
      <ThemedView style={styles.fullModal}>
        <View style={styles.header}>
          <View style={styles.dragIndicator} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title">Send Money</ThemedText>

          <ThemedText style={{ marginTop: 12 }}>Amount</ThemedText>
          <TextInput
            value={amount}
            onChangeText={(t) => setAmount(t)}
            keyboardType="numeric"
            placeholder="0.00"
            style={styles.input}
          />

          <ThemedText style={{ marginTop: 8 }}>Recipient</ThemedText>
          <View style={styles.recipientRow}>
            <TextInput
              value={recipient}
              onChangeText={(t) => setRecipient(t)}
              placeholder="Name or phone"
              style={[styles.input, { flex: 1 }]}
            />
            <Pressable onPress={handleContactPicker} style={styles.smallButton}>
              <Ionicons name={'people-outline'} size={24} />
            </Pressable>
          </View>

          <ThemedText style={{ marginTop: 8 }}>Bank</ThemedText>
          <Pressable
            onPress={() => setShowBankList((s) => !s)}
            style={styles.select}
          >
            <ThemedText>{selectedBank}</ThemedText>
          </Pressable>
          {showBankList && (
            <ScrollView style={{ maxHeight: 160, marginTop: 8 }}>
              {MALAYSIAN_BANKS.map((b) => (
                <Pressable
                  key={b}
                  onPress={() => {
                    setSelectedBank(b);
                    setShowBankList(false);
                  }}
                  style={styles.bankRow}
                >
                  <ThemedText>{b}</ThemedText>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <ThemedText style={{ marginTop: 8 }}>Note (optional)</ThemedText>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            style={[styles.input, { height: 80 }]}
            multiline
          />

          <View style={styles.actionsRow}>
            <Pressable onPress={onExit} style={styles.actionButton}>
              <ThemedText>Cancel</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleAddTransaction}
              style={[styles.actionButton, { backgroundColor: '#2600ffff' }]}
            >
              <ThemedText style={{ color: 'white' }}>Send</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  fullBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'flex-end',
  },
  modal: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  fullModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  header: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 8,
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  recipientRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  smallButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  select: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  bankRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
});
