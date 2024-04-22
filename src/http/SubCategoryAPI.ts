import $host from "./index";
import {FormikValues} from "formik";

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

export const getSubCategoryById = async (id: string) => {
  try {
    const {data} = await $host.get(`/api/v1/SubCategories/${id}`);

    return data;
  } catch (e) {
    console.log(e);
  }
}

export const updateSubCategory = async (id: string | string[] | undefined, category: FormikValues) => {
  const { data } = await $host.put(`/api/v1/SubCategories/${id}/`, {
    name: category.name,
    name_ru: category.name_ru,
    name_en: category.name_en,
    name_uz: category.name_uz
  })

  return data;
}

export const createSubCategory = async (category: ICreateSubCategory) => {
  const { data } = await $host.post('/api/v1/SubCategories/', {
    name: category.name,
    name_ru: category.name_ru,
    name_en: category.name_en,
    name_uz: category.name_uz,
    sub_category: category.sub_category
  })

  return data;
}


export const deleteSubCategory = async (id: number) => {
  const { data } = await $host.delete(`/api/v1/SubCategories/${id}/`);

  return data;
}
