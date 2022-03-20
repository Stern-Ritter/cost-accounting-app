class Transaction {
  readonly id: string;
  readonly eventDate: number;
  readonly category: string;
  readonly subcategory: string;
  readonly amount: number;

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
