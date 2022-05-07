import Category from "./Category";

abstract class CategoryModel {
  abstract getAll(userUID: string): any;
  abstract create(userUID: string, category: Category): any;
  abstract delete(userUID: string, id: string): any;
  abstract deleteAll(userUID: string): any;
}

export default CategoryModel;
