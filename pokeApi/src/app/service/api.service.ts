import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

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
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) {}

  getPokemon(limit: number = 20, offset: number = 0): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default || 'https://via.placeholder.com/200?text=No+Image',
        height: pokemon.height,
        weight: pokemon.weight,
        description: `Alto: ${pokemon.height / 10}m | Peso: ${pokemon.weight / 10}kg`
      }))
    );
  }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonDetail[]> {
    return this.getPokemon(limit, offset).pipe(
      map(response => response.results),
      map(pokemonList => pokemonList.map(p => this.getPokemonDetails(p.name))),
      switchMap(requests => forkJoin(requests))
    );
  }
}
