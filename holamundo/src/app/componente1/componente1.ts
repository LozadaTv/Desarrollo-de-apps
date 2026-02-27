import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './componente1.html',
  styleUrl: './componente1.css',
  providers: [ApiService]
})
export class Componente1 implements OnInit, OnDestroy {
  // esto es el trabajo anterior y.......
  nombre: string = 'Santiago';
  
  // nueva funcionalidad
  textoActual: string = '';
  textoApi: string = '';
  textosRecibidos: string[] = [];
  tarea: string = '';
  lista: string[] = [];
  private subscription: Subscription | null = null;

  constructor(private apiService: ApiService) {
    // Se inicia la suscripción al observable en el constructor
    this.subscription = this.apiService.obtenerTexto().subscribe({
      next: (texto) => {
        this.textoActual = texto;
        this.textoApi = texto;
        if (!this.textosRecibidos.includes(texto)) {
          this.textosRecibidos.push(texto);
        }
        console.log('Texto actual:', texto);
      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Observable completado');
      }
    });
  }

  ngOnInit() {
    console.log('Componente inicializado');
  }

  ngOnDestroy() {
    // Se desuscribe cuando el componente se destruye
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Desuscrito del observable');
    }
  }

  cambiarNombre() {   //Esto sería la contuniación del trabajo anterior, es decir, el cambio de nombre al hacer click en el botón
    if (this.nombre == "Santiago") {
      this.nombre = "Pedro";
    }else {
      this.nombre = "Santiago";
    }
  }

  agregar() {
    if (this.tarea.trim()) {
      this.lista.push(this.tarea);
      this.tarea = '';
    }
  }

  obtenerTextoActual() {
    return this.apiService.obtenerTextoActual();
  }
}
