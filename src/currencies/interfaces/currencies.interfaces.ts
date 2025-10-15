export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  type: string; // o CurrencyType ?
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseWithMessage<T> {
  message: string;
  data?: T | T[];
}
