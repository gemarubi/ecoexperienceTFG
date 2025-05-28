export interface Reserva {
  id:            number;
  fecha:         Date;
  hora:          string;
  asistentes:    number;
  observaciones: string;
  cliente:       Cliente;
  rutas:         Ruta[];
  tukTuks:       TukTuk[];
}

export interface Cliente {
  id:        number;
  nombre:    string;
  apellidos: string;
  tlfno:     string;
  correo:    string;
  dni:       string;
  pais:      string;
  pass:      string;
  deletedAt: null;
}

export interface Ruta {
  id:          number;
  tipo:        string;
  titulo:      string;
  subtitulo:   string;
  descripcion: string;
  imagen:      string;
  precio:      string;
  duracion:    number;
}

export interface TukTuk {
  matricula: string;
  capacidad: number;
  reservas:  Reserva[];
}


export interface Intervalo {
  fecha: string;
  desde: string;
  hasta: string;
}


export interface ReservasList {
  id:            number;
  fecha:        string;
  hora:          string;
  asistentes:    number;
  observaciones: string;
  clienteNombre:  string;
  rutas:         Ruta[];
  tukTuks:       string[];
}




