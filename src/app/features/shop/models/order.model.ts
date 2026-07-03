import { Product } from '../../products/models/product.model';

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: number;
  items: Product[];
  total: number;
  status: OrderStatus;
  placedAt: Date;
}
