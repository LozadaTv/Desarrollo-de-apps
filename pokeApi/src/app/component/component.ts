import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, PokemonDetail } from '../service/api.service';

@Component({
  selector: 'app-component',
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrl: './component.css',
  standalone: true
})
export class PokemonComponent implements OnInit {
  pokemonList: PokemonDetail[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) {
    console.log('✅ PokemonComponent creado');
  }

  ngOnInit(): void {
    console.log('🚀 ngOnInit llamado');
    this.fetchPokemon();
  }

  fetchPokemon(): void {
    console.log('📡 Iniciando petición a API con imágenes...');
    this.loading = true;
    this.error = '';
    this.apiService.getPokemonList(20, 0).subscribe({
      next: (response) => {
        console.log('✅ Datos recibidos:', response);
        this.pokemonList = response;
        this.loading = false;
        console.log('🎉 Lista actualizada:', this.pokemonList.length, 'pokémon');
      },
      error: (err) => {
        console.error('❌ Error en API:', err);
        this.error = 'Error al cargar los pokémon: ' + err.message;
        this.loading = false;
      }
    });
  }
}
