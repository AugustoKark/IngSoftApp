import { IAlquiler, NewAlquiler } from './alquiler.model';

export const sampleWithRequiredData: IAlquiler = {
  id: 11223,
  dias: 17667,
  precioFinal: 14502.48,
};

export const sampleWithPartialData: IAlquiler = {
  id: 22291,
  dias: 14946,
  precioFinal: 31610.41,
};

export const sampleWithFullData: IAlquiler = {
  id: 13774,
  dias: 3575,
  precioFinal: 26062.2,
};

export const sampleWithNewData: NewAlquiler = {
  dias: 13712,
  precioFinal: 6350.93,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
