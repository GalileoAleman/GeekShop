export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    category?:Category;
    type: Type;
  }
 
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export type Type = 'anime' | 'comic';
export type Category = 'figurine' | 'manga' | 'poster' | 'accessory';
