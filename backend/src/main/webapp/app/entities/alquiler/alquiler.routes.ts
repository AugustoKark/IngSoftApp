import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AlquilerResolve from './route/alquiler-routing-resolve.service';

const alquilerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/alquiler.component').then(m => m.AlquilerComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/alquiler-detail.component').then(m => m.AlquilerDetailComponent),
    resolve: {
      alquiler: AlquilerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/alquiler-update.component').then(m => m.AlquilerUpdateComponent),
    resolve: {
      alquiler: AlquilerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/alquiler-update.component').then(m => m.AlquilerUpdateComponent),
    resolve: {
      alquiler: AlquilerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default alquilerRoute;
