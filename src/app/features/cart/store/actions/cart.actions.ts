import { createAction, props } from '@ngrx/store';
import { Product } from '../../../products/models/product.model';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const purchaseCart = createAction('[Cart] Purchase Items');
export const purchaseSuccess = createAction('[Cart] Purchase Success');
export const purchaseFailure = createAction(
  '[Cart] Purchase Failure',
  props<{ error: any }>()
);
