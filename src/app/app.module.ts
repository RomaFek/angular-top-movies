import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MovieListComponent} from './movie-list/component/movie-list.component';
import {MovieComponent} from './movie-item/movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModalComponent} from './avatar-modal/avatar-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {TrimDirective} from './shared/directive/trim.directive';

@NgModule({
    declarations: [
        AppComponent,
        MovieListComponent,
        MovieComponent,
        AvatarModalComponent,
        EditMovieComponent,
        TrimDirective,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
