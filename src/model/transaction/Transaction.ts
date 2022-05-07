class Transaction {
  id: string;
  eventDate: number;
  category: string;
  subcategory: string;
  amount: number;

  constructor(option: TrasactionOption) {
    const { id, eventDate, category, subcategory, amount } = option;
    this.id = typeof id !== "undefined" ? id : "";
    this.eventDate = eventDate;
    this.category = category;
    this.subcategory = subcategory;
    this.amount = amount;
  }
}

export default Transaction;
