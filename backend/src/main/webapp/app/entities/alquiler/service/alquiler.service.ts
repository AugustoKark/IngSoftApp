import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlquiler, NewAlquiler } from '../alquiler.model';

export type PartialUpdateAlquiler = Partial<IAlquiler> & Pick<IAlquiler, 'id'>;

export type EntityResponseType = HttpResponse<IAlquiler>;
export type EntityArrayResponseType = HttpResponse<IAlquiler[]>;

@Injectable({ providedIn: 'root' })
export class AlquilerService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alquilers');

  create(alquiler: NewAlquiler): Observable<EntityResponseType> {
    return this.http.post<IAlquiler>(this.resourceUrl, alquiler, { observe: 'response' });
  }

  update(alquiler: IAlquiler): Observable<EntityResponseType> {
    return this.http.put<IAlquiler>(`${this.resourceUrl}/${this.getAlquilerIdentifier(alquiler)}`, alquiler, { observe: 'response' });
  }

  partialUpdate(alquiler: PartialUpdateAlquiler): Observable<EntityResponseType> {
    return this.http.patch<IAlquiler>(`${this.resourceUrl}/${this.getAlquilerIdentifier(alquiler)}`, alquiler, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlquiler>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlquiler[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAlquilerIdentifier(alquiler: Pick<IAlquiler, 'id'>): number {
    return alquiler.id;
  }

  compareAlquiler(o1: Pick<IAlquiler, 'id'> | null, o2: Pick<IAlquiler, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlquilerIdentifier(o1) === this.getAlquilerIdentifier(o2) : o1 === o2;
  }

  addAlquilerToCollectionIfMissing<Type extends Pick<IAlquiler, 'id'>>(
    alquilerCollection: Type[],
    ...alquilersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const alquilers: Type[] = alquilersToCheck.filter(isPresent);
    if (alquilers.length > 0) {
      const alquilerCollectionIdentifiers = alquilerCollection.map(alquilerItem => this.getAlquilerIdentifier(alquilerItem));
      const alquilersToAdd = alquilers.filter(alquilerItem => {
        const alquilerIdentifier = this.getAlquilerIdentifier(alquilerItem);
        if (alquilerCollectionIdentifiers.includes(alquilerIdentifier)) {
          return false;
        }
        alquilerCollectionIdentifiers.push(alquilerIdentifier);
        return true;
      });
      return [...alquilersToAdd, ...alquilerCollection];
    }
    return alquilerCollection;
  }
}
