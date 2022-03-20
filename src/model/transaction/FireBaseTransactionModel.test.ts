/**
 * @jest-environment node
 */

import { getFirestore } from "firebase/firestore";
import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import FirebaseTransactionModel from "./FireBaseTransactionModel";
import Transaction from "./Transaction";
import { firebaseConfig, testTransactionCollectionName } from "../../utils/api";

let app: FirebaseApp;
let db;
let storage: FirebaseTransactionModel;

describe("FirebaseTransactionModel", () => {
  beforeAll(() => {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = new FirebaseTransactionModel(db, testTransactionCollectionName);
  });

  afterAll(() => {
    deleteApp(app);
  });

  beforeEach(async () => {
    await storage.deleteAll();
  });

  it(`method getAll() return empty array if
  method create() has never been called yet`, async () => {
    const transactions = await storage.getAll();
    expect(transactions).toStrictEqual([]);
  });

  it(`method getAll() return correct values`, async () => {
    const elements: TrasactionOption[] = [
      {
        eventDate: 1647898589153,
        category: "Car",
        subcategory: "Benzine",
        amount: 1000,
      },
      {
        eventDate: 1647998589153,
        category: "Computer",
        subcategory: "Internet",
        amount: 600,
      },
      {
        eventDate: 1648998589153,
        category: "Food",
        subcategory: "Fruit",
        amount: 400,
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const transactionObj = new Transaction(element);
      operations.push(storage.create(transactionObj) as Promise<string>);
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const transactions = await storage.getAll();
    elements.forEach((expectedTransaction) => {
      expect(transactions).toContainEqual(expectedTransaction);
    });
  });

  it("method delete() deletes transaction correctly", async () => {
    const elements: TrasactionOption[] = [
      {
        eventDate: 1647898589153,
        category: "Car",
        subcategory: "Benzine",
        amount: 1000,
      },
      {
        eventDate: 1647998589153,
        category: "Computer",
        subcategory: "Internet",
        amount: 600,
      },
      {
        eventDate: 1648998589153,
        category: "Food",
        subcategory: "Fruit",
        amount: 400,
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const transactionObj = new Transaction(element);
      operations.push(storage.create(transactionObj) as Promise<string>);
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const done = await storage.delete(elements[2].id as string);
    const transactions = await storage.getAll();
    expect(done).toBeTruthy();
    expect(transactions).not.toContainEqual(elements[2]);
    expect(transactions).toContainEqual(elements[0]);
    expect(transactions).toContainEqual(elements[1]);
  });
});
