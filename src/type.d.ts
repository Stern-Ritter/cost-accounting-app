declare module "*.module.css";

type CategoryOptions = {
  id?: string;
  name: string;
  subcategories: string[];
  description: string;
};

type TrasactionOption = {
  id?: string;
  eventDate: number;
  category: string;
  subcategory: string;
  amount: number;
};
