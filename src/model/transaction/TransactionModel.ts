import Transaction from "./Transaction";

abstract class TransactionModel {
  abstract getAll(): any;
  abstract create(category: Transaction): any;
  abstract delete(id: string): any;
  abstract deleteAll(): any;
}

export default TransactionModel;
