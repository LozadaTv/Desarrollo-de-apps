import { Component } from '@angular/core';

@Component({
  selector: 'app-componente1',
  imports: [],
  templateUrl: './componente1.html',
  styleUrl: './componente1.css',
})
export class Componente1 {

  nombre: string = 'Santiago';
  cambiarNombre() {
    if (this.nombre == "Santiago") {
      this.nombre = "Pedro";
    }else {
      this.nombre = "Santiago";
    }
  }
}
