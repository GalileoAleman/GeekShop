export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    category:Category;
    type: Type;
  }
  
export type Type = 'anime' | 'comic';
export type Category = 'figurine' | 'manga' | 'poster' | 'accessory';
