/**
 * @jest-environment node
 */

import { getFirestore } from "firebase/firestore";
import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import FirebaseCategoryModel from "./FireBaseCategoryModel";
import Category from "./Category";
import {
  firebaseConfig,
  testParentCollectionName,
  testCategoryCollectionName,
} from "../../utils/api";

const testUserUID = "testUID";
let app: FirebaseApp;
let db;
let storage: FirebaseCategoryModel;

describe("FirebaseCategoryModel", () => {
  beforeAll(() => {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = new FirebaseCategoryModel(
      db,
      testParentCollectionName,
      testCategoryCollectionName
    );
  });

  afterAll(() => {
    deleteApp(app);
  });

  beforeEach(async () => {
    await storage.deleteAll(testUserUID);
  });

  it(`method getAll() return empty array if
  method create() has never been called yet`, async () => {
    const categories = await storage.getAll(testUserUID);
    expect(categories).toStrictEqual([]);
  });

  it(`method getAll() return correct values`, async () => {
    const elements: CategoryOptions[] = [
      {
        name: "Car",
        subcategories: ["Benzine", "Repair"],
        description: "Car expenses",
      },
      {
        name: "Computer",
        subcategories: ["Internet", "Computer mouse"],
        description: "Computer expenses",
      },
      {
        name: "Food",
        subcategories: ["Vegetables", "Fruit"],
        description: "Food expenses",
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const categoryObj = new Category(element);
      operations.push(
        storage.create(testUserUID, categoryObj) as Promise<string>
      );
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const categories = await storage.getAll(testUserUID);
    elements.forEach((expectedCategory) => {
      expect(categories).toContainEqual(expectedCategory);
    });
  });

  it("method delete() deletes category correctly", async () => {
    const elements: CategoryOptions[] = [
      {
        name: "Car",
        subcategories: ["Benzine", "Repair"],
        description: "Car expenses",
      },
      {
        name: "Computer",
        subcategories: ["Internet", "Computer mouse"],
        description: "Computer expenses",
      },
      {
        name: "Food",
        subcategories: ["Vegetables", "Fruit"],
        description: "Food expenses",
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const categoryObj = new Category(element);
      operations.push(
        storage.create(testUserUID, categoryObj) as Promise<string>
      );
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const done = await storage.delete(testUserUID, elements[0].id as string);
    const categories = await storage.getAll(testUserUID);
    expect(done).toBeTruthy();
    expect(categories).not.toContainEqual(elements[0]);
    expect(categories).toContainEqual(elements[1]);
    expect(categories).toContainEqual(elements[2]);
  });
});
