import { initializeApp, deleteApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import Transaction from "./Transaction";
import TrasactionModel from "./TransactionModel";
import transactionConverter from "../../utils/transactionConverter";

class FirebaseTransactionModel extends TrasactionModel {
  private app;
  private db;
  private collectionName;

  constructor(firebaseConfig: Record<string, unknown>, collectionName: string) {
    super();
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.collectionName = collectionName;
  }

  async getAll(): Promise<Transaction[] | null> {
    try {
      const ref = collection(this.db, this.collectionName).withConverter(transactionConverter);
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
      const ref = collection(this.db, this.collectionName).withConverter(transactionConverter);
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

  async close(): Promise<void> {
    try {
      deleteApp(this.app);
      console.log("App deleted successfully");
    } catch (err) {
      console.log("Error deleting app:", err);
    }
  }
}

export default FirebaseTransactionModel;
