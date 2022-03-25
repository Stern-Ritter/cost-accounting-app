import Transaction from "./Transaction";

abstract class TransactionModel {
  abstract getAll(userUID: string): any;
  abstract create(userUID: string, category: Transaction): any;
  abstract delete(userUID: string, id: string): any;
  abstract deleteAll(userUID: string): any;
}

export default TransactionModel;
