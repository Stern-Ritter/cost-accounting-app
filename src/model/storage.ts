import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  parentCollectionName,
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
  parentCollectionName,
  categoryCollectionName);
const transactionStorage = new FirebaseTransactionModel(
  db,
  parentCollectionName,
  transactionCollectionName
);

const auth = getAuth();

export { db, auth, categoryStorage, transactionStorage };
