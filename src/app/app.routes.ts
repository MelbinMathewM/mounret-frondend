import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './admin/layout/admin-layout';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [

  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home }
    ]
  },

  {
    path: 'admin',
    component: AdminLayout,
    children: adminRoutes
  }

];