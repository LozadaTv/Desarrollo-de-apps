import { Injectable } from '@angular/core';
import { BehaviorSubject,interval } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {   //clase publica es para que se pueda usar en otros componentes, el decorador Injectable es para que se pueda inyectar en otros componentes
    private textos = ["hola!", "como estas?", "bienvenido a angular!, esto es un servicio"];
    private indice = 0; // 0 es el  "hola!", 1 es el "como estas?", 2 es el "bienvenido a angular!, esto es un servicio"

    public textoActual = new BehaviorSubject<string>(this.textos[this.indice]); // el BehaviorSubject es un tipo de observable que permite emitir un valor inicial y luego emitir nuevos valores a medida que cambian. En este caso, se inicializa con el primer texto del array textos.

    constructor() {
        // cada 2 segundos se cambia el texto actual al siguiente texto del array textos
        interval(2000).subscribe(() => {    // estos simbolos (() => { es para que me diga que indice es el texto actual, y el subscribe es para que se ejecute cada vez que se emite un nuevo valor del intervalo y sica como un ciclo sin fin
            this.indice = (this.indice + 1) % this.textos.length; // se incrementa el índice y se usa el operador módulo para que no se pase del tamaño del array
            this.textoActual.next(this.textos[this.indice]); // se emite el nuevo *texto actual*
        });
    }

    obtenerTexto() {
        return this.textoActual.asObservable(); // se devuelve el texto actual como un observable para que otros componentes puedan suscribirse a él y recibir actualizaciones cuando cambie el texto
    }

        obtenerTextoActual() {
            return {
                mensaje: this.textoActual.getValue(), // se devuelve el valor actual del texto sin necesidad de suscribirse al observable
                actual: this.textos[this.indice] // se devuelve el texto actual del array textos
            };
        }
    }