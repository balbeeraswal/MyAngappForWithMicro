import { createReducer, on } from '@ngrx/store';
import * as CatalogActions from '../actions/catalog.actions';
import { initialCatalogState } from '../../../orders/store/catelog.states';

export const catalogReducer = createReducer(
  initialCatalogState,
  on(CatalogActions.loadProducts, (state) => ({ 
    ...state, 
    loading: true 
  })),
  on(CatalogActions.loadProductsSuccess, (state, { products, totalItems }) => ({
    ...state,
    loading: false,
    products: products, // Overwrites previous 10 items with the new 10 items
    totalItems: totalItems
  })),
  on(CatalogActions.changePage, (state, { page }) => ({
    ...state,
    currentPage: page,
    loading: true
  }))
);