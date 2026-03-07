import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, map, switchMap, catchError } from 'rxjs';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetail {
  name: string;
  image: string;
  description: string;
  id: number;
  height: number;
  weight: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(limit: number = 20, offset: number = 0): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<PokemonDetail> {
    console.log('Obteniendo detalles de:', name);
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      map(pokemon => {
        // Usar URL oficial de render.io que es más confiable que githubusercontent
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        
        const detail = {
          id: pokemon.id,
          name: pokemon.name,
          image: imageUrl,
          height: pokemon.height,
          weight: pokemon.weight,
          description: `Alto: ${(pokemon.height / 10).toFixed(1)}m | Peso: ${(pokemon.weight / 10).toFixed(1)}kg`
        };
        console.log('Detalle cargado:', detail.name, '- Imagen:', detail.image);
        return detail;
      }),
      catchError(error => {
        console.error(`❌ Error cargando ${name}:`, error);
        return of({
          id: 0,
          name: name,
          image: 'https://via.placeholder.com/200?text=Error',
          height: 0,
          weight: 0,
          description: 'Error al cargar'
        });
      })
    );
  }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonDetail[]> {
    console.log('Iniciando getPokemonList');
    return this.getPokemon(limit, offset).pipe(
      switchMap(response => {
        console.log('Pokémon recibidos:', response.results.length);
        const detailRequests = response.results.map(pokemon => 
          this.getPokemonDetails(pokemon.name)
        );
        console.log('Ejecutando', detailRequests.length, 'peticiones en paralelo...');
        return forkJoin(detailRequests);
      }),
      map(details => details.sort((a, b) => a.id - b.id)),
      catchError(error => {
        console.error('❌ Error en getPokemonList:', error);
        return of([]);
      })
    );
  }
}
