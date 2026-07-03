import { createAction, props } from '@ngrx/store';
import { Product } from '../../../products/models/product.model';

export const loadProducts = createAction('[Product Catalog] Load Products');

export const loadProductsSuccess = createAction(
  '[Product Catalog API] Load Products Success',
  props<{ products: Product[]; totalItems: number }>()
);

export const loadProductsFailure = createAction(
  '[Product Catalog API] Load Products Failure',
  props<{ error: string }>()
);

export const changePage = createAction(
  '[Product Catalog] Change Page',
  props<{ page: number }>()
);