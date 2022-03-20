import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Transaction from "./Transaction";
import TransactionModel from "./TransactionModel";
import transactionConverter from "../../utils/transactionConverter";

class FirebaseTransactionModel extends TransactionModel {
  private db;
  private collectionName;

  constructor(db: Firestore, collectionName: string) {
    super();
    this.db = db;
    this.collectionName = collectionName;
  }

  async getAll(): Promise<Transaction[] | null> {
    try {
      const ref = collection(this.db, this.collectionName).withConverter(
        transactionConverter
      );
      const querySnapshot = await getDocs(ref);
      const transactions: Transaction[] = [];
      querySnapshot.forEach((document) => transactions.push(document.data()));
      return transactions;
    } catch (err) {
      console.log("Error get documents: ", err);
      return null;
    }
  }

  async create(transaction: Transaction): Promise<string | null> {
    try {
      const ref = collection(this.db, this.collectionName).withConverter(
        transactionConverter
      );
      const querySnapshot = await addDoc(ref, transaction);
      console.log("Transaction written with ID: ", querySnapshot.id);
      return querySnapshot.id;
    } catch (err) {
      console.log("Error adding transaction: ", err);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(this.db, this.collectionName, String(id)));
      console.log("Transaction deleted with ID: ", id);
      return true;
    } catch (err) {
      console.log("Error deleting transaction: ", err);
      return false;
    }
  }

  async deleteAll(): Promise<boolean> {
    try {
      const transactions = (await this.getAll()) ?? [];
      const operations: Promise<void>[] = [];
      transactions.forEach((transaction) =>
        operations.push(
          deleteDoc(doc(this.db, this.collectionName, String(transaction.id)))
        )
      );
      await Promise.all(operations);
      console.log("All transactions deleted");
      return true;
    } catch (err) {
      console.log("Error deleting all transactions: ", err);
      return false;
    }
  }
}

export default FirebaseTransactionModel;
