type Transaction = {
  id?: string
  amount: number
  accountId: number // Account.ts
  userId: number // User.ts
  operation: string // 'deposit' | 'withdraw'
  createdAt?: string
  updatedAt?: string
};

export default Transaction