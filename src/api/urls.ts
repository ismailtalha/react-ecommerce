const baseUrl = "https://fakestoreapi.com";

export default {
    product: {
        getAll: (): string =>`${baseUrl}/products`,
        getById: (id: string): string => `${baseUrl}/Products/${id}`,
        create: (): string => `${baseUrl}/Products`,
        update:(id: string): string => `${baseUrl}/Products/${id}`,
        remove:(id: string): string => `${baseUrl}/Products/${id}`,
        removeAll:(): string => `${baseUrl}/Products`,
        findByTitle:(title: string): string => `${baseUrl}/Products?title=${title}`,
    },
};
