export interface IAuto {
  id: number;
  modelo?: string | null;
  km?: number | null;
  hp?: number | null;
  transmision?: string | null;
  precio?: number | null;
  descripcion?: string | null;
  img?: string | null;
}

export type NewAuto = Omit<IAuto, 'id'> & { id: null };
