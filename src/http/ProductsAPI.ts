import $host from "./index";


export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  currency: string;
  category: number;
  image: File | null;
}

export const getProducts = async () => {
  try {
    const {data} = await $host.get("/api/v1/products/");

    return data;
  } catch (e) {
    console.log(e);
  }
}

export const deleteProduct = async (productId: number) => {
  try {
    const {data} = await $host.delete(`/api/v1/products/${productId}/`);

    return data;
  } catch (e) {
    console.log(e);
  }
}

export const createProduct = async (product: ICreateProduct) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("category", product.category.toString());
  formData.append("price", product.price.toString());
  formData.append("currency", product.currency);
  if (product.image) {
    formData.append("photo", product.image);

  }
  const {data} = await $host.post("/api/v1/products/", formData);

  return data;
}
