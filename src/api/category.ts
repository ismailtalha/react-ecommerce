import axios from 'api';
import urls from 'api/urls';
import { AxiosResponse } from 'axios';

import ICategoryData from 'types/ICategory';
import IProductData from 'types/IProduct';

export const getCategorys = async (): Promise<AxiosResponse<string[]>> => {
    return await axios.get(urls.category.getAll())
};

export const getCategoryproducts = async (title: string): Promise<AxiosResponse<IProductData[]>> => {
    return await axios.get(urls.category.getCategoryProducts(title));
};
