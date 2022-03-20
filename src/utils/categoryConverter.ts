import Category from "../model/category/Category";

const categoryConverter = {
  toFirestore: (category: Category) => ({
    name: category.name,
    subcategories: category.subcategories,
    description: category.description,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Category({
      id: snapshot.id,
      name: data.name,
      subcategories: data.subcategories,
      description: data.description,
    });
  },
};

export default categoryConverter;
