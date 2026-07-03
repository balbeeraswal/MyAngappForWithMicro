import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState } from '../../../orders/store/catelog.states';

export const selectCatalogState = createFeatureSelector<CatalogState>('catalog');

export const selectCatalogParams = createSelector(
  selectCatalogState,
  (state) => ({
    currentPage: state.currentPage,
    pageSize: state.pageSize
  })
);
