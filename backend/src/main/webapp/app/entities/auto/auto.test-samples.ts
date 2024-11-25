import { IAuto, NewAuto } from './auto.model';

export const sampleWithRequiredData: IAuto = {
  id: 22188,
  modelo: 'card disadvantage',
  km: 19750,
  hp: 25070,
  transmision: 'swath brr scholarship',
  precio: 29707.28,
};

export const sampleWithPartialData: IAuto = {
  id: 6061,
  modelo: 'violently er',
  km: 17667,
  hp: 30257,
  transmision: 'how',
  precio: 26891.74,
  img: 'quadruple hundred quizzically',
};

export const sampleWithFullData: IAuto = {
  id: 26191,
  modelo: 'wherever',
  km: 19512,
  hp: 7125,
  transmision: 'gum even fraternise',
  precio: 3084.52,
  descripcion: 'phooey astride',
  img: 'dulcimer',
};

export const sampleWithNewData: NewAuto = {
  modelo: 'upbeat with bruised',
  km: 12758,
  hp: 8759,
  transmision: 'duh wise',
  precio: 10560.12,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
