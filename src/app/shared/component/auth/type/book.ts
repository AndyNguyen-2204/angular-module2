export interface BookType {
  id: string;
  cover_image: string;
  title: string;
  price: number;
  quantity_available: number;
  description: string;
  genre: {
    title: string;
    type: string;
  };
  author: string;
  publication_year: number;
  rating: number;
  quantity: number;
}
