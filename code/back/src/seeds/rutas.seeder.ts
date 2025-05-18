import { DataSource } from 'typeorm';
import { Ruta } from '../rutas/entities/ruta.entity';

export const seedRutas = async (dataSource: DataSource) => {
  const rutaRepo = dataSource.getRepository(Ruta);

  const rutasData = [
    {
      tipo: 'Tuk Tuk',
      titulo: 'Tour en Tuk Tuk por Córdoba',
      subtitulo: 'Recorrido panorámico por los principales monumentos',
      descripcion:
        'Explora la ciudad de Córdoba desde una perspectiva única a bordo de un tuk-tuk eléctrico. Visita lugares emblemáticos como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente, acompañado por un guía profesional.',
      imagen: 'https://cordobaecoexperience.es/images/tuk-tuk-tour.jpg',
      precio: 25.00,
      duracion: 75,
    },
    {
      tipo: 'A pie',
      titulo: 'Free Tour por Córdoba',
      subtitulo: 'Descubre la historia y cultura de la ciudad',
      descripcion:
        'Disfruta de un recorrido a pie por el centro histórico de Córdoba, visitando lugares como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, la Plaza del Potro, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente. Finaliza el tour en el Patio de los Naranjos de la Mezquita-Catedral.',
      imagen: 'https://cordobaecoexperience.es/images/free-tour.jpg',
      precio: 0.00,
      duracion: 90,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita a la Mezquita-Catedral',
      subtitulo: 'Explora el monumento más emblemático de Córdoba',
      descripcion:
        'Realiza una visita guiada por la Mezquita-Catedral de Córdoba, descubriendo su historia, arquitectura y arte. Acompañado por un guía experto, conocerás los detalles de este Patrimonio de la Humanidad.',
      imagen: 'https://cordobaecoexperience.es/images/mezquita-catedral.jpg',
      precio: 12.00,
      duracion: 60,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita al Alcázar de los Reyes Cristianos',
      subtitulo: 'Recorre los jardines y salones del Alcázar',
      descripcion:
        'Descubre el Alcázar de los Reyes Cristianos, una fortaleza con impresionantes jardines y salones históricos. La visita incluye una guía detallada por las distintas estancias y patios del monumento.',
      imagen: 'https://cordobaecoexperience.es/images/alcazar.jpg',
      precio: 10.00,
      duracion: 60,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta de las Tres Culturas',
      subtitulo: 'Un viaje por la Córdoba judía, cristiana y musulmana',
      descripcion:
        'Embárcate en un recorrido que te llevará por los principales monumentos de las tres culturas que convivieron en Córdoba: la Mezquita-Catedral, el Alcázar de los Reyes Cristianos y la Judería.',
      imagen: 'https://cordobaecoexperience.es/images/tres-culturas.jpg',
      precio: 20.00,
      duracion: 120,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita a Medina Azahara',
      subtitulo: 'Explora la ciudad palatina del Califato',
      descripcion:
        'Visita las ruinas de Medina Azahara, la ciudad palatina construida por el califa Abderramán III. Conoce su historia y arquitectura en una visita guiada por este yacimiento arqueológico.',
      imagen: 'https://cordobaecoexperience.es/images/medina-azahara.jpg',
      precio: 15.00,
      duracion: 150,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta de los Patios de Córdoba',
      subtitulo: 'Descubre la tradición de los patios cordobeses',
      descripcion:
        'Recorre los patios más emblemáticos de Córdoba, conocidos por su belleza y tradición. Aprende sobre su historia y la cultura que los rodea en esta visita guiada.',
      imagen: 'https://cordobaecoexperience.es/images/patios.jpg',
      precio: 8.00,
      duracion: 90,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta Gastronómica: Sabores de Córdoba',
      subtitulo: 'Degusta los platos típicos cordobeses',
      descripcion:
        'Participa en una ruta gastronómica por Córdoba, degustando platos típicos como el salmorejo, el rabo de toro y los flamenquines. Incluye visitas a tabernas tradicionales y explicaciones sobre la cocina local.',
      imagen: 'https://cordobaecoexperience.es/images/gastronomia.jpg',
      precio: 30.00,
      duracion: 120,
    },
  ];

  const rutas = rutasData.map((ruta) => rutaRepo.create(ruta));
  await rutaRepo.save(rutas);

 
};