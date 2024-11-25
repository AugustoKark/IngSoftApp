import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '645e41af-58ed-4747-845b-3a122dfa0acf',
};

export const sampleWithPartialData: IAuthority = {
  name: 'cab6a17e-c1d8-40ab-802b-e2d19f066fc5',
};

export const sampleWithFullData: IAuthority = {
  name: '8b2e8a2f-c4ff-4a41-a126-36b5c206cc88',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
