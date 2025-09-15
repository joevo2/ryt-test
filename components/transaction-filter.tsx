import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Props = {
  dateFilter: 'all' | '7' | '30';
  typeFilter: 'all' | 'debit' | 'credit';
  setDateFilter: (v: 'all' | '7' | '30') => void;
  setTypeFilter: (v: 'all' | 'debit' | 'credit') => void;
};

export default function TransactionFilters({
  dateFilter,
  setDateFilter,
  typeFilter,
  setTypeFilter,
}: Props) {
  return (
    <ThemedView style={styles.filtersRowContainer}>
      <ThemedView style={styles.filterGroup}>
        <ThemedText type="defaultSemiBold">Date</ThemedText>
        <ThemedView style={styles.filterButtonsRow}>
          {['all', '7', '30'].map((d) => (
            <Pressable
              key={d}
              onPress={() => setDateFilter(d as any)}
              style={[
                styles.filterButton,
                dateFilter === d && styles.filterButtonActive,
              ]}
            >
              <ThemedText>{d === 'all' ? 'All' : `${d}d`}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.filterGroup}>
        <ThemedText type="defaultSemiBold">Type</ThemedText>
        <ThemedView style={styles.filterButtonsRow}>
          {['all', 'debit', 'credit'].map((t) => (
            <Pressable
              key={t}
              onPress={() => setTypeFilter(t as any)}
              style={[
                styles.filterButton,
                typeFilter === t && styles.filterButtonActive,
              ]}
            >
              <ThemedText>
                {t === 'all' ? 'All' : t[0].toUpperCase() + t.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filtersRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  filterGroup: {
    flexDirection: 'column',
  },
  filterButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#e6f7ff',
    borderColor: '#70b7ff',
  },
});
