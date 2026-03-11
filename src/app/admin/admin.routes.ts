import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Categories } from './categories/categories';
import { Brands } from './brands/brands';
import { Products } from './products/products';
import { Offers } from './offers/offers';
import { Orders } from './orders/orders';

export const adminRoutes: Routes = [

  { path: '', component: Dashboard },
  { path: 'categories', component: Categories },
  { path: 'brands', component: Brands },
  { path: 'products', component: Products },
  { path: 'offers', component: Offers },
  { path: 'orders', component: Orders },

];