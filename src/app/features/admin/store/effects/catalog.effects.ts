import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CatalogActions from '../actions/catalog.actions';
import { ProductService } from '../../../products/services/product.services';
import { selectCatalogParams } from '../selectectors/catelog.selectors';

@Injectable()
export class CatalogEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      // Listens for initial load or page change actions
      ofType(CatalogActions.loadProducts, CatalogActions.changePage),
      // Selects current page (e.g. 1) and limit (10) from the store
      withLatestFrom(this.store.pipe(select(selectCatalogParams))),
      switchMap(([action, params]) =>
        // API URL format: /api/products?page=1&limit=10
        this.productService.getProducts(params.currentPage, params.pageSize).pipe(
          map((response) =>
            CatalogActions.loadProductsSuccess({
              products: response.items,       // The array of 10 items
              totalItems: response.totalCount // Total catalog count for pagination layout
            })
          ),
          catchError((error) =>
            of(
              CatalogActions.loadProductsFailure({
                error: error instanceof Error ? error.message : String(error)
              })
            )
          )
        )
      )
    )
  );
}