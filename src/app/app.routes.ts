import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './admin/layout/admin-layout';
import { adminRoutes } from './admin/admin.routes';
import { AdminGuard } from './admin/auth/guards/admin.guard';
import { ProductList } from './features/products/product-list/product-list';
import { ProductDetail } from './features/products/product-details/product-details';

export const routes: Routes = [

  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home },
      { path: 'products', component: ProductList },
      { path: 'products/:id', component: ProductDetail },
    ]
  },

  {
    path: 'admin/login',
    loadComponent: () =>
      import('./admin/auth/login/admin-login')
        .then(m => m.AdminLogin)
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: adminRoutes
  }

];