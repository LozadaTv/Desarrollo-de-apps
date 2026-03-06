import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-descripcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descripcion.html',
  styleUrl: './descripcion.css'
})
export class Descripcion implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movie = this.movieService.getMovieById(movieId);
    });
  }

  addToHistorial(): void {
    if (this.movie) {
      this.movieService.addToHistorial(this.movie);
      this.router.navigate(['/historial']);
    }
  }

  goBack(): void {
    this.router.navigate(['/categoria']);
  }
}
