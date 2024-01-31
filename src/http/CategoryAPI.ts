import $host from "./index";

export const getCategories = async () => {
  try {
    const {data} = await $host.get("/api/v1/categories/");
    return data;
  } catch (e) {
    console.log(e);
  }
};

interface ICreateCategory {
  name: string;
  name_ru: string;
  name_en: string;
  name_uz: string;
}

export const createCategory = async (category: ICreateCategory) => {
  const {data} = await $host.post('/api/v1/categories/', {
    name: category.name,
    name_ru: category.name_ru,
    name_en: category.name_en,
    name_uz: category.name_uz
  });
  return data;
}
