import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAuto } from '../auto.model';
import { AutoService } from '../service/auto.service';

const autoResolve = (route: ActivatedRouteSnapshot): Observable<null | IAuto> => {
  const id = route.params.id;
  if (id) {
    return inject(AutoService)
      .find(id)
      .pipe(
        mergeMap((auto: HttpResponse<IAuto>) => {
          if (auto.body) {
            return of(auto.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default autoResolve;
