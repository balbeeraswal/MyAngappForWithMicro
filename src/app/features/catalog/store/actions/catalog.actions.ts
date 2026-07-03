import { createAction, props } from '@ngrx/store';
import { Product } from '../../../products/models/product.model';

export const loadProducts = createAction('[Catalog] Load Products');
export const changePage = createAction(
  '[Catalog] Change Page',
  props<{ currentPage: number }>()
);

export const loadProductsSuccess = createAction(
  '[Catalog] Load Products Success',
  props<{ products: Product[]; totalItems: number }>()
);

export const loadProductsFailure = createAction(
  '[Catalog] Load Products Failure',
  props<{ error: string }>()
);
