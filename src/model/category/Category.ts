class Category {
  readonly id: string;
  readonly name: string;
  readonly subcategories: string[];
  readonly description: string;

  constructor(options: CategoryOptions) {
    const { id, name, subcategories, description } = options;
    this.id = typeof id !== "undefined" ? id : "";
    this.name = name;
    this.subcategories = subcategories;
    this.description = description;
  }
}

export default Category;