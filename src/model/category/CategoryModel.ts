import Category from "./Category";

abstract class CategoryModel {
  abstract getAll(): any;
  abstract create(category: Category): any;
  abstract delete(id: string): any;
  abstract deleteAll(): any;
}

export default CategoryModel;