import { Product } from '../../products/models/product.model';

export interface CatalogState {
  products: Product[];      // Array holding exactly 10 products for the current view
  totalItems: number;       // e.g., 25,430 items found matching "Mobile Phones"
  currentPage: number;      // Tracks pagination (Starts at 1)
  pageSize: number;         // Fixed to 10 for the initial view
  loading: boolean;         // Spinner trigger
  error: string | null;     // Error handling
}

export const initialCatalogState: CatalogState = {
  products: [],
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,             // Tells the backend to only send 10 items initially
  loading: false,
  error: null
};