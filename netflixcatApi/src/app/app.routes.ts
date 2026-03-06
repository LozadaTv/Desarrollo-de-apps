import { Routes } from '@angular/router';
import { Categoria } from './categoria/categoria';
import { Descripcion } from './descripcion/descripcion';
import { Historial } from './historial/historial';

export const routes: Routes = [
  { path: '', redirectTo: 'categoria', pathMatch: 'full' },
  { path: 'categoria', component: Categoria },
  { path: 'descripcion/:id', component: Descripcion },
  { path: 'historial', component: Historial }
];
