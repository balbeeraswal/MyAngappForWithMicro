import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from '../actions/cart.actions';
import { CartService } from '../../services/cart.services';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  purchaseCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.purchaseCart),
      mergeMap(() =>
        this.cartService.purchase().pipe(
          map(() => CartActions.purchaseSuccess()),
          catchError(error => of(CartActions.purchaseFailure({ error })))
        )
      )
    )
  );
}
