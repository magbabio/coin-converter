export interface Conversion {
  id: string;
  userId: string;
  fromCurrencyId: string;
  toCurrencyId: string;
  amount: number;
  result: number;
  rateUsed: number;
  createdAt: Date;
}

export interface ResponseWithMessage<T> {
  message: string;
  data?: T | T[];
}
