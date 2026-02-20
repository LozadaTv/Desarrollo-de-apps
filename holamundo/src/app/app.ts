import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Componente1 } from './componente1/componente1';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Componente1],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('holamundo');
}
