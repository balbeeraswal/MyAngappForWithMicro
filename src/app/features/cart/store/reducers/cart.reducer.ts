import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { Product} from '../../../products/models/product.model';

export interface CartState {
  items: Product[];
  purchased: boolean;
  error: any;
}

export const initialState: CartState = {
  items: [],
  purchased: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => ({
    ...state,
    items: [...state.items, product]
  })),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(p => p.id !== productId)
  })),
  on(CartActions.purchaseSuccess, state => ({
    ...state,
    purchased: true,
    items: []
  })),
  on(CartActions.purchaseFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
