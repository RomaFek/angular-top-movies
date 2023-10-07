import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieListComponent} from './movie-list/component/movie-list.component';
import {MovieComponent} from './movie-item/movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';

const routes: Routes = [

  {path: '', component: MovieListComponent},
  {path: 'component', loadChildren: () => import('./admin/module/admin.module').then(m => m.AdminModule),},
  {path: 'movies/:id', component: MovieComponent},
  {path: 'editmovie/:id', component: EditMovieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
