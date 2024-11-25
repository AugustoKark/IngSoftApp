import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlquiler } from '../alquiler.model';
import { AlquilerService } from '../service/alquiler.service';

const alquilerResolve = (route: ActivatedRouteSnapshot): Observable<null | IAlquiler> => {
  const id = route.params.id;
  if (id) {
    return inject(AlquilerService)
      .find(id)
      .pipe(
        mergeMap((alquiler: HttpResponse<IAlquiler>) => {
          if (alquiler.body) {
            return of(alquiler.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default alquilerResolve;
