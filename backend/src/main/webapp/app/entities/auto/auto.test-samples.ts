import { IAuto, NewAuto } from './auto.model';

export const sampleWithRequiredData: IAuto = {
  id: 15937,
  modelo: 'amnesty allegation',
  km: 30178,
  hp: 27452,
  transmision: 'whenever instruction',
  precio: 8637.78,
};

export const sampleWithPartialData: IAuto = {
  id: 15376,
  modelo: 'cope grandson measly',
  km: 15632,
  hp: 20843,
  transmision: 'regularly geez worst',
  precio: 12269.12,
  img: 'scientific deform provided',
};

export const sampleWithFullData: IAuto = {
  id: 25338,
  modelo: 'gripping muted slipper',
  km: 18512,
  hp: 21657,
  transmision: 'denitrify unless',
  precio: 28715.15,
  descripcion: 'although',
  img: 'along enthusiastically creak',
};

export const sampleWithNewData: NewAuto = {
  modelo: 'since',
  km: 24616,
  hp: 24304,
  transmision: 'yowza',
  precio: 31936.32,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
