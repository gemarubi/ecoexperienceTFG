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
        'Explora la ciudad de Córdoba desde una perspectiva única a bordo de un tuk-tuk eléctrico. Visita lugares emblemáticos como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente, acompañado por un guía profesional.<br><br>Si quieres conocer Córdoba al detalle, éste es el tour perfecto. Ya que tendrás la oportunidad de visualizar las principales partes del casco histórico así como los lugares icónicos de la ciudad. En este tour disfrutarás de una experiencia completa y detallada. Pero no acaba ahí, te mostraremos la parte más cosmopolita de la ciudad, dónde se concentra la vida y por supuesto en todo momento estaremos asesorándote para lo que necesites.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/free-tour.jpg?w=800&ssl=1',
      precio: 25.00,
      duracion: 75,
    },
    {
      tipo: 'A pie',
      titulo: 'Free Tour por Córdoba',
      subtitulo: 'Descubre la historia y cultura de la ciudad',
      descripcion:
        'Queremos que te sumerjas en una experiencia llena de historia y lugares únicos. Te mostraremos sitios tan icónicos como la Plaza de la Corredera, el patio de los Naranjos de la Mezquita Catedral, el famoso Puente Romano y un sinfín de lugares más.<br> Si quieres tener una experiencia diferente, reserva ya nuestro FREETOUR Paseo por Córdoba. <br>Recorrido: Plaza de las Tendillas > Templo Romano > Plaza de la Corredera > Plaza del Potro > Puente Romano > Torre de la Calahorra > Puerta del Puente > Patio de los Naranjos',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/free-tour.jpg?w=800&ssl=1',
      precio: 0.00,
      duracion: 90,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita a la Mezquita-Catedral',
      subtitulo: 'Explora el monumento más emblemático de Córdoba',
      descripcion:
        'Realiza una visita guiada por la Mezquita-Catedral de Córdoba, descubriendo su historia, arquitectura y arte. Acompañado por un guía experto, conocerás los detalles de este Patrimonio de la Humanidad.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-mezquita.jpg?w=800&ssl=1',
      precio: 12.00,
      duracion: 60,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita al Alcázar de los Reyes Cristianos',
      subtitulo: 'Recorre los jardines y salones del Alcázar',
      descripcion:
        'Descubre el Alcázar de los Reyes Cristianos, una fortaleza con impresionantes jardines y salones históricos.<br>El Alcázar de los Reyes Cristianos se remonta a 1328, debe su nombre a los diferentes reyes que han vivido en la fortaleza desde que la ciudad de Córdoba fue reconquistada por los cristianos en el siglo XIII. Aunque de todos los Reyes que han vivido en el Alcázar los más conocidos han sido los Reyes Católicos; Isabel y Fernando. <br>En nuestra visita al Alcázar de Córdoba podrá descubrir la historia que guarda la fortaleza, así como los impresionantes jardines que se albergan en el interior del monumento.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-alcazar.jpg?w=800&ssl=1',
      precio: 10.00,
      duracion: 60,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta de las Tres Culturas',
      subtitulo: 'Un viaje por la Córdoba judía, cristiana y musulmana',
      descripcion:
        'Si no quieres perderte detalle alguno de la ciudad debes de realizar la visita guiada a la Mezquita, el Alcázar y la judería de Córdoba. La duración es aproximadamente de tres horas en la que haremos descansos entre monumento y monumento, y te aseguramos que tendrás una visión monumental general de una ciudad con miles de años de historia.Es una visita guiada muy completa, en ella podrás dejarte llevar y despreocuparte por horarios, nosotros te organizamos todo el itinerario. El primer monumento que se visita es la Mezquita Catedral, más tarde continuaremos con la fortaleza medieval por excelencia en Córdoba; el Alcázar. Y culminaremos recorriendo las callejas de la judería de Córdoba, iremos a los puntos más turísticos de este enclave.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-tres-culturas.jpg?w=800&ssl=1',
      precio: 20.00,
      duracion: 120,
    },
    {
      tipo: 'A pie',
      titulo: 'Visita a Medina Azahara',
      subtitulo: 'Explora la ciudad palatina del Califato',
      descripcion:
        'Visita las ruinas de Medina Azahara, la ciudad palatina construida por el califa Abderramán III. Conoce su historia y arquitectura en una visita guiada por este yacimiento arqueológico.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-medina-azahara.jpg?w=800&ssl=1',
      precio: 15.00,
      duracion: 150,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta de los Patios de Córdoba',
      subtitulo: 'Descubre la tradición de los patios cordobeses',
      descripcion:
        'Recorre los patios más emblemáticos de Córdoba, conocidos por su belleza y tradición. Aprende sobre su historia y la cultura que los rodea en esta visita guiada.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-esencial.jpg?w=800&ssl=1',
      precio: 8.00,
      duracion: 90,
    },
    {
      tipo: 'A pie',
      titulo: 'Ruta Gastronómica: Sabores de Córdoba y Espectáculo Ecuestre',
      subtitulo: 'Degusta los platos típicos cordobeses',
      descripcion:
        'Participa en una ruta gastronómica por Córdoba, degustando platos típicos como el salmorejo, el rabo de toro y los flamenquines. Incluye visitas a tabernas tradicionales y explicaciones sobre la cocina local.',
      imagen: 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/cordoba-ecuestre.jpg?w=800&ssl=1',
      precio: 30.00,
      duracion: 120,
    },
  ];

  const rutas = rutasData.map((ruta) => rutaRepo.create(ruta));
  await rutaRepo.save(rutas);

 
};