import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AutoResolve from './route/auto-routing-resolve.service';

const autoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/auto.component').then(m => m.AutoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/auto-detail.component').then(m => m.AutoDetailComponent),
    resolve: {
      auto: AutoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/auto-update.component').then(m => m.AutoUpdateComponent),
    resolve: {
      auto: AutoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/auto-update.component').then(m => m.AutoUpdateComponent),
    resolve: {
      auto: AutoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default autoRoute;
