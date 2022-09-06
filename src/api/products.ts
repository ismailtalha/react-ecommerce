import axios from 'api';
import urls from 'api/urls';
import { AxiosResponse } from 'axios';

import IProductData from 'types/IProduct';

export const getProducts = async (): Promise<AxiosResponse<IProductData[]>> => {
    return await axios.get(urls.product.getAll())
};

export const getProduct = async (id: string): Promise<AxiosResponse<IProductData[]>> => {
    return await axios.get(urls.product.getById(id));
};

export const createProduct = async (data: IProductData): Promise<AxiosResponse<IProductData>> => {
    return await axios.post(urls.product.create(), data);
}

export const updateProduct = async (id: string, data: IProductData): Promise<AxiosResponse<IProductData>> => {
    return await axios.put(urls.product.update(id), data);
}

export const removeProduct = async (id: string): Promise<AxiosResponse<IProductData>> => {
    return await axios.delete(urls.product.remove(id));
}

export const removeAll = async (): Promise<AxiosResponse<IProductData>> => {
    return await axios.delete(urls.product.removeAll());
}

export const findProductsByTitle = async (title: string): Promise<AxiosResponse<IProductData[]>> => {
    return await axios.get(urls.product.findByTitle(title));
};