import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Product } from '../products/models/product.model';
import { SAMPLE_PRODUCTS } from './data/sample-products';
import { addToCart, purchaseFailure, purchaseSuccess, removeFromCart } from '../cart/store/actions/cart.actions';
import { CartState } from '../cart/store/reducers/cart.reducer';
import { CartService } from '../cart/services/cart.services';
import { Order, OrderStatus } from './models/order.model';

type ShopView = 'items' | 'orders' | 'order-status' | 'stock';

interface AppState {
  count: number;
  cart: CartState;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class ShopComponent {
  private store = inject(Store<AppState>);
  private cartService = inject(CartService);

  readonly menuItems: { id: ShopView; label: string }[] = [
    { id: 'items', label: 'List of Items' },
    { id: 'orders', label: 'Orders' },
    { id: 'order-status', label: 'Order Status' },
    { id: 'stock', label: 'Stock' }
  ];

  activeView: ShopView = 'items';
  inventory: Product[] = SAMPLE_PRODUCTS.map((p) => ({ ...p }));
  orders: Order[] = [];
  cartItems$ = this.store.pipe(select((state: AppState) => state.cart?.items ?? []));
  purchasing = false;
  message = '';
  private nextOrderId = 1;

  get availableProducts(): Product[] {
    return this.inventory.filter((p) => p.stock > 0);
  }

  setView(view: ShopView): void {
    this.activeView = view;
    this.message = '';
  }

  addToCart(product: Product): void {
    this.message = '';
    this.store.dispatch(addToCart({ product }));
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  getCartTotal(items: Product[] | null): number {
    return (items ?? []).reduce((sum, item) => sum + item.price, 0);
  }

  isInCart(items: Product[] | null, productId: number): boolean {
    return (items ?? []).some((item) => item.id === productId);
  }

  getStatusClass(status: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      Placed: 'text-bg-primary',
      Processing: 'text-bg-warning',
      Shipped: 'text-bg-info',
      Delivered: 'text-bg-success'
    };
    return map[status];
  }

  placeOrder(): void {
    this.store
      .pipe(
        select((state: AppState) => state.cart?.items ?? []),
        take(1)
      )
      .subscribe((items: Product[]) => {
        if (items.length === 0) {
          this.message = 'Your cart is empty. Add items before placing an order.';
          return;
        }

        const purchasedIds = items.map((item) => item.id);
        this.purchasing = true;
        this.message = '';

        this.cartService.purchase().subscribe({
          next: () => {
            const order: Order = {
              id: this.nextOrderId++,
              items: [...items],
              total: this.getCartTotal(items),
              status: 'Placed',
              placedAt: new Date()
            };

            this.orders = [order, ...this.orders];
            this.inventory = this.inventory.map((product) =>
              purchasedIds.includes(product.id) ? { ...product, stock: 0 } : product
            );

            this.store.dispatch(purchaseSuccess());
            this.purchasing = false;
            this.activeView = 'orders';
            this.message = `Order #${order.id} placed successfully. View it in Orders or Order Status.`;
          },
          error: (error) => {
            this.store.dispatch(purchaseFailure({ error }));
            this.purchasing = false;
            this.message = 'Order failed. Please try again.';
          }
        });
      });
  }
}
