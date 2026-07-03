import { createReducer, on } from '@ngrx/store';
import * as CatalogActions from '../actions/catalog.actions';
import { Product } from '../../../products/models/product.model';

export interface CatalogState {
  products: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export const initialState: CatalogState = {
  products: [],
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  loading: false,
  error: null
};

export const catalogReducer = createReducer(
  initialState,
  on(CatalogActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(CatalogActions.changePage, (state, { currentPage }) => ({
    ...state,
    currentPage
  })),
  on(CatalogActions.loadProductsSuccess, (state, { products, totalItems }) => ({
    ...state,
    products,
    totalItems,
    loading: false
  })),
  on(CatalogActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
