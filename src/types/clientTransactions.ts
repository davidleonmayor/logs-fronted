export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  transactions: Transaction[];
}

export interface ClientData {
  clients: Client[];
}
