import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState } from '../reducers/catalog.reducer';

export const selectCatalogState = createFeatureSelector<CatalogState>('catalog');

export const selectCatalogParams = createSelector(
  selectCatalogState,
  (state) => ({
    currentPage: state.currentPage,
    pageSize: state.pageSize
  })
);

export const selectProducts = createSelector(
  selectCatalogState,
  (state) => state.products
);
