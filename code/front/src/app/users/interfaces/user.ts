export interface User {
  id?:        number;
  nombre:    string;
  apellidos: string;
  tlfno:     string;
  correo:    string;
  dni:       string;
  pais:      string;
  pass:      string;
  deletedAt?: null;
  roles:     Role[];
}

export interface Role {
  id:          number;
  descripcion: string;
}


