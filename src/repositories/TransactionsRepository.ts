import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalValue('income');
    const outcome = this.getTotalValue('outcome');
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  private getTotalValue(type: 'income' | 'outcome'): number {
    return this.transactions
      .map(transaction => (transaction.type === type ? transaction.value : 0))
      .reduce((total, value) => {
        return total + value;
      }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
