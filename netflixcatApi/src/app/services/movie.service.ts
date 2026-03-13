import { Injectable, signal } from '@angular/core';

export interface Movie {
  id: number;
  title: string;
  image: string;
  description: string;
  category: 'Terror' | 'Acción' | 'Ciencia Ficción';
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly STORAGE_KEY = 'netflix-historial';
  private historialSignal = signal<Movie[]>([]);
  
  historial = this.historialSignal.asReadonly();

  private movies: Movie[] = [
    // Terror
    {
      id: 1,
      title: 'Alien: Isolation',
      image: 'https://cdn2.steamgriddb.com/thumb/79c13d436a27633a80830cd3ab624b32.jpg',
      description: '<strong>Sinopsis:</strong> Quince años después de la desaparición de la Nostromo, Amanda Ripley viaja a la decadente estación espacial Sevastopol siguiendo el rastro de su madre. Lo que debería ser una búsqueda de respuestas se convierte en una pesadilla de supervivencia cuando queda atrapada con un único depredador implacable. En una estación al borde del colapso y sin armas para defenderse, Amanda descubrirá que el miedo es un cazador que nunca se cansa.',
      //<strong></strong> Sinopsis = pone en texto en negrita
      // su función está en /descripcion.html donde se muestra la descripción de la película, y al usar [innerHTML] se interpreta el HTML dentro de la cadena, permitiendo que el texto "Sinopsis:" aparezca en negrita.
      category: 'Terror'
    },
    {
      id: 2,
      title: 'Resident Evil',
      image: 'https://cdn2.steamgriddb.com/thumb/f7a9f3ae0db4a4b2fba5a733393e2a0a.jpg',
      description: '<strong>Sinopsis:</strong> Un brote final amenaza con consumir los restos de la civilización. Leon S. Kennedy y Jill Valentine deben unir fuerzas en una última misión suicida para erradicar el legado de Umbrella antes de que el mundo se convierta en una necrópolis silenciosa.',
      category: 'Terror'
    },
    {
      id: 3,
      title: 'Viernes 13',
      image: 'https://cdn2.steamgriddb.com/thumb/9a728375b5cafea9d257d4bfc4511d60.jpg',
      description: '<strong>Sinopsis:</strong> Lo que debía ser un verano de diversión en Camp Crystal Lake se convierte en una carnicería. Una leyenda urbana con máscara de hockey regresa de entre los muertos para reclamar venganza, demostrando que en estos bosques, la muerte no acepta un "no" por respuesta.',
      category: 'Terror'
    },
    {
      id: 4,
      title: 'The Joy of Creation',
      image: 'https://cdn2.steamgriddb.com/thumb/597827df2b12ea729424a7dc87190b1a.jpg',
      description: '<strong>Sinopsis:</strong> En una noche de tormenta, el creador se convierte en la presa. Los recuerdos distorsionados de creaciones mecánicas cobran vida para cazar a quien les dio forma, convirtiendo un hogar familiar en una trampa de pesadilla hecha de metal y cables.',
      category: 'Terror'
    },
    // Acción
    {
      id: 5,
      title: 'God of War',
      image: 'https://cdn2.steamgriddb.com/thumb/74661d90d9f74a002b532d286c7e1d61.jpg',
      description: '<strong>Sinopsis:</strong> Lejos de la sangre de Grecia, un Kratos más viejo busca cumplir la última voluntad de su esposa en las gélidas tierras nórdicas. Acompañado de su hijo Atreus, deberá enfrentar a dioses extraños mientras lucha por no dejar que su pasado destruya el futuro del niño.',
      category: 'Acción'
    },
    {
      id: 6,
      title: 'Spider-Man',
      image: 'https://cdn2.steamgriddb.com/thumb/c878640912baf0bd9ecdc39228e8c816.jpg',
      description: '<strong>Sinopsis:</strong> Peter Parker finalmente ha encontrado el equilibrio entre su vida y su deber, pero cuando una nueva amenaza emerge para destruir Nueva York, las líneas se borran. Ser Spider-Man tiene un precio, y Peter está a punto de descubrir que no puede salvar a todos.',
      category: 'Acción'
    },
    {
      id: 7,
      title: 'Mission Impossible',
      image: 'https://imusic.b-cdn.net/images/item/original/119/7333018035119.jpg?2025-mission-impossible-8-the-final-reckoning-4k-uhd-blu-ray&class=scaled&v=1753354572',
      description: '<strong>Sinopsis:</strong> Un agente secreto realiza misiones imposibles para salvar al mundo.',
      category: 'Acción'
    },
    {
      id: 8,
      title: 'Dragon Ball',
      image: 'https://cdn2.steamgriddb.com/thumb/10aa5ed789b940e7aaea2ed186bfba51.jpg',
      description: '<strong>Sinopsis:</strong> Con Goku y Vegeta fuera del planeta, la Tierra queda vulnerable ante el resurgir de la Patrulla Roja. Gohan debe despertar su verdadero poder oculto y Piccolo asumir el liderazgo para detener a una nueva generación de androides definitivos.',
      category: 'Acción'
    },
    // Ciencia Ficción
    {
      id: 9,
      title: 'Portal 2',
      image: 'https://cdn2.steamgriddb.com/thumb/f27159c8f16ed644c45ba8598d7dd975.jpg',
      description: '<strong>Sinopsis:</strong> Despiertas siglos después en las ruinas de Aperture Science. Con la ayuda de un núcleo robótico algo torpe y bajo la mirada sarcástica de una IA rencorosa, deberás usar la lógica y portales espaciales para escapar de un laboratorio que se niega a dejarte ir.',
      category: 'Ciencia Ficción'
    },
    {
      id: 10,
      title: 'Interstellar',
      image: 'https://mythicwall.com/cdn/shop/files/Interstellar_2BMovie_2B_2Bposter_2BPrint_2BWall_2BArt_2BPoster_2B1-W0pfS_1024x1024.jpg?v=1762442294',
      description: '<strong>Sinopsis:</strong> Astronautas viajan a través de un agujero de gusano en busca de un nuevo hogar.',
      category: 'Ciencia Ficción'
    },
    {
      id: 11,
      title: 'Matrix',
      image: 'https://cdn2.steamgriddb.com/thumb/94e261564c5dec80ba24019f47cf1b6f.jpg',
      description: '<strong>Sinopsis:</strong> Un hacker descubre que la realidad es una simulación controlada por máquinas.',
      category: 'Ciencia Ficción'
    },
    {
      id: 12,
      title: 'Star Wars',
      image: 'https://cdn2.steamgriddb.com/thumb/83742b11c6c6a09c42f65fd567b92d65.jpg',
      description: '<strong>Sinopsis:</strong> En una galaxia sumida en la tiranía, un joven granjero se une a un grupo de rebeldes y a un viejo caballero místico. Su viaje lo llevará a descubrir una fuerza ancestral y a enfrentar al imperio más temible del universo para devolver la esperanza.',
      category: 'Ciencia Ficción'
    }
  ];

  constructor() {
    this.loadHistorialFromStorage();
  }

  private loadHistorialFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const historialData = JSON.parse(stored);
        this.historialSignal.set(historialData);
      }
    } catch (error) {
      console.error('Error al cargar historial desde localStorage:', error);
    }
  }

  private saveHistorialToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.historialSignal()));
    } catch (error) {
      console.error('Error al guardar historial en localStorage:', error);
    }
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getMoviesByCategory(category: 'Terror' | 'Acción' | 'Ciencia Ficción'): Movie[] {
    return this.movies.filter(movie => movie.category === category);
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  addToHistorial(movie: Movie): void {
    const historialArray = this.historialSignal();
    if (!historialArray.find(m => m.id === movie.id)) {
      this.historialSignal.set([...historialArray, movie]);
      this.saveHistorialToStorage();
    }
  }

  removeFromHistorial(id: number): void {
    const historialArray = this.historialSignal();
    this.historialSignal.set(historialArray.filter(m => m.id !== id));
    this.saveHistorialToStorage();
  }

  clearHistorial(): void {
    this.historialSignal.set([]);
    this.saveHistorialToStorage();
  }
}
