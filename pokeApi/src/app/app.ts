import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './component/component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('pokeApi');
}
