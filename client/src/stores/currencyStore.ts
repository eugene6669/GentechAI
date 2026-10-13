import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Currency store - manages selected currency across the app
 */

export interface Currency {
  code: string;
  symbol: string;
  label: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
];

interface CurrencyState {
  selectedCurrency: Currency;
  balance: number;
  setSelectedCurrency: (currency: Currency) => void;
  setBalance: (balance: number) => void;
  formatAmount: (amount: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selectedCurrency: currencies[3], // PHP default
      balance: 0,
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
      setBalance: (balance) => set({ balance }),
      formatAmount: (amount) => {
        const { selectedCurrency } = get();
        return `${selectedCurrency.symbol} ${amount.toFixed(2)}`;
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);
