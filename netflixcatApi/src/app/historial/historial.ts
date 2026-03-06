import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial {
  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  get historial() {
    return this.movieService.historial;
  }

  removeFromHistorial(movieId: number): void {
    this.movieService.removeFromHistorial(movieId);
  }

  goBack(): void {
    this.router.navigate(['/categoria']);
  }

  clearAll(): void {
    if (confirm('¿Estás seguro de que deseas borrar todo el historial?')) {
      this.movieService.clearHistorial();
    }
  }
}
