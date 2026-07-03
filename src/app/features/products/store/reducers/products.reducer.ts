import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/products.actions';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, state => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products.slice(0, 10), // show only first 10 initially
    loading: false
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
