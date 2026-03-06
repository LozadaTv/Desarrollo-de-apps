import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria implements OnInit {
  movies: Movie[] = [];
  categories = ['Terror', 'Acción', 'Ciencia Ficción'] as const;
  moviesByCategory: { [key: string]: Movie[] } = {};

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.categories.forEach(cat => {
      this.moviesByCategory[cat] = this.movieService.getMoviesByCategory(cat);
    });
  }

  viewMovie(movieId: number): void {
    this.router.navigate(['/descripcion', movieId]);
  }
}
