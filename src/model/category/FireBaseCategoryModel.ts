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
import Category from "./Category";
import CategoryModel from "./CategoryModel";
import categoryConverter from "../../utils/categoryConverter";

class FirebaseCategoryModel extends CategoryModel {
  private app;
  private db;
  private collectionName;

  constructor(firebaseConfig: Record<string, unknown>, collectionName: string) {
    super();
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.collectionName = collectionName;
  }

  async getAll(): Promise<Category[] | null> {
    try {
      const ref = collection(this.db, this.collectionName).withConverter(categoryConverter);
      const querySnapshot = await getDocs(ref);
      const categories: Category[] = [];
      querySnapshot.forEach((document) => categories.push(document.data()));
      return categories;
    } catch (err) {
      console.log("Error get categories: ", err);
      return null;
    }
  }

  async create(category: Category): Promise<string | null> {
    try {
      const ref = collection(this.db, this.collectionName).withConverter(categoryConverter);
      const querySnapshot = await addDoc(ref, category);
      console.log("Category written with ID: ", querySnapshot.id);
      return querySnapshot.id;
    } catch (err) {
      console.log("Error adding category: ", err);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(this.db, this.collectionName, String(id)));
      console.log("Category deleted with ID: ", id);
      return true;
    } catch (err) {
      console.log("Error deleting category: ", err);
      return false;
    }
  }

  async deleteAll(): Promise<boolean> {
    try {
      const categories = (await this.getAll()) ?? [];
      const operations: Promise<void>[] = [];
      categories.forEach((category) =>
        operations.push(
          deleteDoc(doc(this.db, this.collectionName, String(category.id)))
        )
      );
      await Promise.all(operations);
      console.log("All categories deleted");
      return true;
    } catch (err) {
      console.log("Error deleting all categories: ", err);
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

export default FirebaseCategoryModel;
