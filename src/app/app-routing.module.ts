import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './content/movie-list/movie-list.component';
import { MovieComponent } from './content/movie-list/movie/movie.component';
import { EditMovieComponent } from './content/movie-list/movie/edit-movie/edit-movie.component';

const routes: Routes = [

  { path: '', component: MovieListComponent },
  { path: 'admin', loadChildren: () => import('./content/admin/admin.module').then(m => m.AdminModule), },
  { path: 'movies/:id', component: MovieComponent },
  { path: 'editmovie/:id', component: EditMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
