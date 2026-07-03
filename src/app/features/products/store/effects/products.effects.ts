import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CatalogActions from '../../../catalog/store/actions/catalog.actions';
import { selectCatalogParams } from '../../../catalog/store/selectors/catelog.selectors';
import { ProductService } from '../../services/product.services'; // ✅ import ProductService from the correct path  

@Injectable()
export class CatalogEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService); // ✅ class name capitalized
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatalogActions.loadProducts, CatalogActions.changePage),
      withLatestFrom(this.store.pipe(select(selectCatalogParams))),
      switchMap(([action, params]) =>
        this.productService.getProducts(params.currentPage, params.pageSize).pipe(
          map((response) =>
            CatalogActions.loadProductsSuccess({
              products: response.items,
              totalItems: response.totalCount
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
