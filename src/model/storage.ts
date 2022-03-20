import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  categoryCollectionName,
  transactionCollectionName,
  firebaseConfig,
} from "../utils/api";
import FirebaseCategoryModel from "./category/FireBaseCategoryModel";
import FirebaseTransactionModel from "./transaction/FireBaseTransactionModel";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categoryStorage = new FirebaseCategoryModel(
  db,
  categoryCollectionName
);
const transactionStorage = new FirebaseTransactionModel(
  db,
  transactionCollectionName
);

export { db, categoryStorage, transactionStorage };
