import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MovieListComponent} from './content/movie-list/movie-list.component';
import {MovieComponent} from './content/movie-list/movie/movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModalComponent} from './content/movie-list/avatar-modal/avatar-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {EditMovieComponent} from './content/movie-list/movie/edit-movie/edit-movie.component';
import {MovieService} from './content/movie-list/original-movie.service';
import {TrimDirective} from './content/movie-list/trim.directive';
import {MovieFilterDirective} from './content/movie-list/movie-filter.directive';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    AvatarModalComponent,
    EditMovieComponent,
    TrimDirective,
    MovieFilterDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,

  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
