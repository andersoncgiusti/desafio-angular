import { Routes } from '@angular/router';
import { MarvelComponent } from './features/marvel/components/marvel/marvel.component';

export const routes: Routes = [
  { path: 'marvel', component: MarvelComponent },
  { path: '', redirectTo: '/marvel', pathMatch: 'full' }
];
