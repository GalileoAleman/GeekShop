export interface Product {
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
  
export type Category = 'anime' | 'comic';
export type Type = 'figurine' | 'manga' | 'poster' | 'accessory';