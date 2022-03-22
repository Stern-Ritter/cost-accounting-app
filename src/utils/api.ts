const categoryCollectionName = "cost-counting-categories";
const transactionCollectionName = "cost-counting-transactions";

const testCategoryCollectionName = "test-cost-counting-categories";
const testTransactionCollectionName = "test-cost-counting-transactions";

const firebaseConfig = {
  apiKey: "AIzaSyBPyBw6fy_fg9blrYbkGFvLObqc06eu938",
  authDomain: "my-cost-accounting-app.firebaseapp.com",
  projectId: "my-cost-accounting-app",
  storageBucket: "my-cost-accounting-app.appspot.com",
  messagingSenderId: "152084713601",
  appId: "1:152084713601:web:880d8f9443cbb6c38ebd80",
};

const serializeQuery = (queryParams: Record<string, any>) => {
  const query = Object.entries(queryParams).reduce(
    (acc, [key, value], index, array) => {
      if (!value) {
        return acc;
      }
      const postfix = index === array.length - 1 ? "" : "&";
      return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(
        value
      )}${postfix}`;
    },
    "?"
  );

  if (query.length === 1) {
    return "";
  }
  if (query[query.length - 1] === "&") {
    return query.slice(0, -1);
  }
  return query;
};

const deserializeQuery = (
  query: string,
  noQuestionMark = false
): Record<string, string> => {
  const decodedQuery = decodeURIComponent(query);
  const pairs = (noQuestionMark ? query : decodedQuery.substring(1)).split("&");
  const array = pairs.map((elem) => elem.split("="));
  return Object.fromEntries(array);
};

export {
  testCategoryCollectionName,
  testTransactionCollectionName,
  categoryCollectionName,
  transactionCollectionName,
  firebaseConfig,
  serializeQuery,
  deserializeQuery,
};
