import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'rentalCarApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'auto',
    data: { pageTitle: 'rentalCarApp.auto.home.title' },
    loadChildren: () => import('./auto/auto.routes'),
  },
  {
    path: 'alquiler',
    data: { pageTitle: 'rentalCarApp.alquiler.home.title' },
    loadChildren: () => import('./alquiler/alquiler.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
