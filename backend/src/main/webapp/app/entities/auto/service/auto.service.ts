import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAuto, NewAuto } from '../auto.model';

export type PartialUpdateAuto = Partial<IAuto> & Pick<IAuto, 'id'>;

export type EntityResponseType = HttpResponse<IAuto>;
export type EntityArrayResponseType = HttpResponse<IAuto[]>;

@Injectable({ providedIn: 'root' })
export class AutoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/autos');

  create(auto: NewAuto): Observable<EntityResponseType> {
    return this.http.post<IAuto>(this.resourceUrl, auto, { observe: 'response' });
  }

  update(auto: IAuto): Observable<EntityResponseType> {
    return this.http.put<IAuto>(`${this.resourceUrl}/${this.getAutoIdentifier(auto)}`, auto, { observe: 'response' });
  }

  partialUpdate(auto: PartialUpdateAuto): Observable<EntityResponseType> {
    return this.http.patch<IAuto>(`${this.resourceUrl}/${this.getAutoIdentifier(auto)}`, auto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAuto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAuto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAutoIdentifier(auto: Pick<IAuto, 'id'>): number {
    return auto.id;
  }

  compareAuto(o1: Pick<IAuto, 'id'> | null, o2: Pick<IAuto, 'id'> | null): boolean {
    return o1 && o2 ? this.getAutoIdentifier(o1) === this.getAutoIdentifier(o2) : o1 === o2;
  }

  addAutoToCollectionIfMissing<Type extends Pick<IAuto, 'id'>>(
    autoCollection: Type[],
    ...autosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const autos: Type[] = autosToCheck.filter(isPresent);
    if (autos.length > 0) {
      const autoCollectionIdentifiers = autoCollection.map(autoItem => this.getAutoIdentifier(autoItem));
      const autosToAdd = autos.filter(autoItem => {
        const autoIdentifier = this.getAutoIdentifier(autoItem);
        if (autoCollectionIdentifiers.includes(autoIdentifier)) {
          return false;
        }
        autoCollectionIdentifiers.push(autoIdentifier);
        return true;
      });
      return [...autosToAdd, ...autoCollection];
    }
    return autoCollection;
  }
}
