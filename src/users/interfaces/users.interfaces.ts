export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ResponseWithMessage<T> {
  message: string;
  data?: T | T[];
}
