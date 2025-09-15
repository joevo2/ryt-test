export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  timestamp: number;
};

function randomAmount() {
  const sign = Math.random() < 0.25 ? 1 : -1; // mostly debits
  const value = Math.round((Math.random() * 500 + 1) * 100) / 100;
  return sign * value;
}

function randomDate(index: number) {
  const base = new Date();
  base.setDate(base.getDate() - index);
  return base.toLocaleDateString('en-MY', { month: 'short', day: 'numeric' });
}

function randomTimestamp(index: number) {
  const base = new Date();
  base.setDate(base.getDate() - index);
  return base.getTime();
}

const MERCHANTS = [
  ['Coffee Shop', 'Caffeinated beans'],
  ['Payroll', 'Acme Corp'],
  ['Grocery', 'Market Square'],
  ['Electric', 'Monthly bill'],
  ['Internet', 'ISP'],
  ['Gym', 'Monthly membership'],
  ['Restaurant', 'Dinner out'],
  ['Subscription', 'Streaming service'],
  ['Gas', 'Fuel station'],
  ['Pharmacy', 'Health supplies'],
];

const TRANSACTIONS: Transaction[] = Array.from({ length: 100 }).map((_, i) => {
  const m = MERCHANTS[i % MERCHANTS.length];
  return {
    id: String(i + 1),
    title: m[0],
    subtitle: m[1],
    date: randomDate(i),
    amount: randomAmount(),
    timestamp: randomTimestamp(i),
  };
});

export default TRANSACTIONS;
