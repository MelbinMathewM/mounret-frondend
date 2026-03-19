import { Routes } from '@angular/router';

export const adminRoutes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories')
        .then(m => m.Categories)
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./brands/brands')
        .then(m => m.Brands)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/products')
        .then(m => m.Products)
  },

  {
    path: 'enquiries',
    loadComponent: () =>
      import('./enquiries/enquiries')
        .then(m => m.AdminEnquiries)
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }

];