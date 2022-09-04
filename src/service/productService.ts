import http from "../config/http-common";
import IProductData from "../types/IProduct";
const getAll = () => {
  return http.get<Array<IProductData>>("/products");
};
const get = (id: any) => {
  return http.get<IProductData>(`/Products/${id}`);
};
const create = (data: IProductData) => {
  return http.post<IProductData>("/Products", data);
};
const update = (id: any, data: IProductData) => {
  return http.put<any>(`/Products/${id}`, data);
};
const remove = (id: any) => {
  return http.delete<any>(`/Products/${id}`);
};
const removeAll = () => {
  return http.delete<any>(`/Products`);
};
const findByTitle = (title: string) => {
  return http.get<Array<IProductData>>(`/Products?title=${title}`);
};
const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default ProductService;