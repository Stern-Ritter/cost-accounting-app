import Transaction from "./Transaction";

abstract class TrasactionModel {
  abstract getAll(): any;
  abstract create(category: Transaction): any;
  abstract delete(id: string): any;
  abstract deleteAll(): any;
}

export default TrasactionModel;
