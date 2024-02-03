import $host from "./index";
import {ISubCategory} from "./types";

export interface ICreateSubCategory {
  name: string;
  name_ru: string;
  name_en: string;
  name_uz: string;
  sub_category: number;
}
export const getSubCategories = async () => {
  try {
    const {data} = await $host.get("/api/v1/SubCategories/");
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const createSubCategory = async (category: ICreateSubCategory) => {
  const { data } = await $host.post('/api/v1/SubCategories/', {
    name: category.name,
    name_ru: category.name_ru,
    name_en: category.name_en,
    name_uz: category.name_uz,
    sub_category: category.sub_category
  })
  console.log(data);

  return data;
}
