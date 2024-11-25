import { IAlquiler, NewAlquiler } from './alquiler.model';

export const sampleWithRequiredData: IAlquiler = {
  id: 4216,
  dias: 4809,
  precioFinal: 24301.42,
};

export const sampleWithPartialData: IAlquiler = {
  id: 676,
  dias: 17333,
  precioFinal: 21603.34,
};

export const sampleWithFullData: IAlquiler = {
  id: 30891,
  dias: 27215,
  precioFinal: 11119.46,
};

export const sampleWithNewData: NewAlquiler = {
  dias: 6913,
  precioFinal: 30893.5,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
