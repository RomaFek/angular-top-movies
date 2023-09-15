import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModalComponent } from './components/avatar-modal/avatar-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { MovieService } from './original-movie.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    AvatarModalComponent,
    EditMovieComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
