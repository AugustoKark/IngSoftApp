import { IAuto } from 'app/entities/auto/auto.model';
import { IUser } from 'app/entities/user/user.model';

export interface IAlquiler {
  id: number;
  dias?: number | null;
  precioFinal?: number | null;
  auto?: IAuto | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewAlquiler = Omit<IAlquiler, 'id'> & { id: null };
