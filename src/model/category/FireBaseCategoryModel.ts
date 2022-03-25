import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Category from "./Category";
import CategoryModel from "./CategoryModel";
import categoryConverter from "../../utils/categoryConverter";

class FirebaseCategoryModel extends CategoryModel {
  private db;
  private parentCollectionName;
  private collectionName;

  constructor(
    db: Firestore,
    parentCollectionName: string,
    collectionName: string
  ) {
    super();
    this.db = db;
    this.parentCollectionName = parentCollectionName;
    this.collectionName = collectionName;
  }

  async getAll(userUID: string): Promise<Category[] | null> {
    try {
      const ref = collection(
        this.db,
        this.parentCollectionName,
        userUID,
        this.collectionName
      ).withConverter(categoryConverter);
      const querySnapshot = await getDocs(ref);
      const categories: Category[] = [];
      querySnapshot.forEach((document) => categories.push(document.data()));
      return categories;
    } catch (err) {
      console.log("Error get categories: ", err);
      return null;
    }
  }

  async create(userUID: string, category: Category): Promise<string | null> {
    try {
      const ref = collection(
        this.db,
        this.parentCollectionName,
        userUID,
        this.collectionName
      ).withConverter(categoryConverter);
      const querySnapshot = await addDoc(ref, category);
      console.log("Category written with ID: ", querySnapshot.id);
      return querySnapshot.id;
    } catch (err) {
      console.log("Error adding category: ", err);
      return null;
    }
  }

  async delete(userUID: string, id: string): Promise<boolean> {
    try {
      await deleteDoc(
        doc(
          this.db,
          this.parentCollectionName,
          userUID,
          this.collectionName,
          String(id)
        )
      );
      console.log("Category deleted with ID: ", id);
      return true;
    } catch (err) {
      console.log("Error deleting category: ", err);
      return false;
    }
  }

  async deleteAll(userUID: string): Promise<boolean> {
    try {
      const categories = (await this.getAll(userUID)) ?? [];
      const operations: Promise<void>[] = [];
      categories.forEach((category) =>
        operations.push(
          deleteDoc(
            doc(
              this.db,
              this.parentCollectionName,
              userUID,
              this.collectionName,
              String(category.id)
            )
          )
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
}

export default FirebaseCategoryModel;
