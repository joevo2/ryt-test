import TransactionFilters from '@/components/transaction-filter';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Transaction } from '../../data/transactions';
import { useTransactions } from '../contexts';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabTwoScreen() {
  const { transactions } = useTransactions();

  const [dateFilter, setDateFilter] = useState<'all' | '7' | '30'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'debit' | 'credit'>(
    'all'
  );

  const filteredData = useMemo(() => {
    const now = Date.now();
    const cutoff7 = now - 1000 * 60 * 60 * 24 * 7;
    const cutoff30 = now - 1000 * 60 * 60 * 24 * 30;

    return transactions.filter((transaction: Transaction) => {
      // type filter
      if (typeFilter === 'debit' && transaction.amount >= 0) return false;
      if (typeFilter === 'credit' && transaction.amount < 0) return false;

      // date filter
      if (dateFilter === '7' && transaction.timestamp < cutoff7) return false;
      if (dateFilter === '30' && transaction.timestamp < cutoff30) return false;

      return true;
    });
  }, [dateFilter, transactions, typeFilter]);

  function renderItem({ item: transaction }: { item: Transaction }) {
    const amountColor = transaction.amount < 0 ? '#FF3B30' : '#34C759';
    const amountText = `${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}`;

    return (
      <ThemedView style={styles.row}>
        <ThemedView style={styles.rowLeft}>
          <ThemedView style={styles.avatar} />
          <ThemedView style={styles.rowText}>
            <ThemedText type="defaultSemiBold">{transaction.title}</ThemedText>
            <ThemedText>{transaction.subtitle}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.rowRight}>
          <ThemedText style={{ color: amountColor }}>{amountText}</ThemedText>
          <ThemedText>{transaction.date}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: useThemeColor({}, 'background') }}
      edges={{ top: 'maximum' }}
    >
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Transactions</ThemedText>
        </ThemedView>
        <ThemedText>Recent activities on your accounts</ThemedText>
        <TransactionFilters
          dateFilter={dateFilter}
          typeFilter={typeFilter}
          setDateFilter={setDateFilter}
          setTypeFilter={setTypeFilter}
        />
      </ThemedView>
      <ThemedView style={styles.listContainer}>
        <FlashList
          style={styles.list}
          data={filteredData}
          renderItem={renderItem}
        />
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
  headerContainer: {
    padding: 16,
    gap: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e6e6e6',
    backgroundColor: 'transparent',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  rowText: {
    flexDirection: 'column',
  },
  rowRight: {
    alignItems: 'flex-end',
  },
});
