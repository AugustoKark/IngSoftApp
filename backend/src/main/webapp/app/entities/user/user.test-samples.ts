import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 19482,
  login: '_lc@D\\%G2\\n2V9Ck',
};

export const sampleWithPartialData: IUser = {
  id: 21191,
  login: 'br',
};

export const sampleWithFullData: IUser = {
  id: 24113,
  login: 'spR',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
