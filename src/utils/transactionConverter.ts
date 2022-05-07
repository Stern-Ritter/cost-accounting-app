import Transaction from "../model/transaction/Transaction";

const transactionConverter = {
  toFirestore: (transaction: Transaction) => ({
    eventDate: transaction.eventDate,
    category: transaction.category,
    subcategory: transaction.subcategory,
    amount: transaction.amount,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Transaction({
      id: snapshot.id,
      eventDate: data.eventDate,
      category: data.category,
      subcategory: data.subcategory,
      amount: Number(data.amount),
    });
  },
};

export default transactionConverter;
