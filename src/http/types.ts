

export interface ICategory {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  name_uz: string;
}

export interface ISubCategory {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  name_uz: string;
  sub_category: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: "UZS" | "USD";
  photo: string;
}
