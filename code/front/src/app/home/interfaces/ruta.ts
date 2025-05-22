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
export interface Filtro {
  tipo: string;
  precioMax: number;
  duracionMin: number;
  duracionMax: number;
  preferencias: string[];
}
