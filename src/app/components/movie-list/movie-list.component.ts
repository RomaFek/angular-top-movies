import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/original-movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class MovieListComponent implements OnDestroy {
  movies: Movie[] = this.movieService.getMovies();
  searchText: string = '';
  private searchTextSubject = new Subject<string>();
  private searchTextSubscription: Subscription | undefined;

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.searchTextSubscription = this.searchTextSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.filterMovies(searchText);
        this.cdr.markForCheck();
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

  ngOnDestroy() {
    if (this.searchTextSubscription) {
      this.searchTextSubscription.unsubscribe();
    }
  }
}
