import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/original-movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})


export class MovieListComponent {


  movies: Movie[] = this.movieService.getMovies();
  isSuperUser: boolean = false;
  showAdminButton: boolean = false;
  searchText: string = '';
  private searchTextSubject = new Subject<string>();


  constructor(private movieService: MovieService, private dialog: MatDialog, private router: Router) {
    this.searchTextSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.filterMovies(searchText);
      });
  }

  onSearchTextChange(text: string) {
    this.searchTextSubject.next(text);
  }

  filterMovies(searchText: string) {
    if (!searchText) {
      this.movies = this.movieService.getMovies();
      return;
    }

    this.movies = this.movieService.getMovies().filter(movie => {
      return movie.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  openModal(avatarUrl: string) {
    this.dialog.open(AvatarModalComponent, {
      data: { avatarUrl },
    });
  }

  toggleAdminButton() {
    this.showAdminButton = this.isSuperUser;
  }

  redirectToAdmin() {
    this.router.navigate(['/admin']);
  }
}