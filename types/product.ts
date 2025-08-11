export interface Product {
  id: number;
  name: string;
  price: number;
  endPrice: number;
  description: string;
  fullDescription?: string;
  image: string;
  category: string;
  listThumbnail?: string[];
  listItems?: string[];
  colorChoice?: Record<string, string>;
}
