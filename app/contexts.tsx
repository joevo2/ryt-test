import React, { createContext, ReactNode, useContext, useState } from 'react';
import TRANSACTIONS, { Transaction } from '../data/transactions';

type TransactionInput = {
  title: string;
  subtitle: string;
  amount: number;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (input: TransactionInput) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);

  const addTransaction = (input: TransactionInput) => {
    const now = new Date();
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      title: input.title,
      subtitle: input.subtitle,
      amount: input.amount,
      timestamp: now.getTime(),
      date: now.toLocaleDateString('en-MY', { month: 'short', day: 'numeric' }),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider'
    );
  }
  return context;
};
