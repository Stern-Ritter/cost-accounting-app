import { categoryCollectionName, transactionCollectionName, firebaseConfig } from "../utils/api";
import { getFirestore } from "firebase/firestore";
import FirebaseCategoryModel from "./category/FireBaseCategoryModel";
import FirebaseTransactionModel from "./transaction/FireBaseTransactionModel";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categoryStorage = new FirebaseCategoryModel(db, categoryCollectionName);
const transactionStorage = new FirebaseTransactionModel(db, transactionCollectionName);

export { categoryStorage, transactionStorage };
