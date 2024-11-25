import { IAuto } from 'app/entities/auto/auto.model';

export interface IAlquiler {
  id: number;
  dias?: number | null;
  precioFinal?: number | null;
  auto?: IAuto | null;
}

export type NewAlquiler = Omit<IAlquiler, 'id'> & { id: null };
