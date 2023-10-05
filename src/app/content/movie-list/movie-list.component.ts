import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Movie} from 'src/app/content/movie-list/movie-models/movie.model';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AvatarModalComponent} from './avatar-modal/avatar-modal.component';
import {Router} from '@angular/router';
import {MovieService} from 'src/app/content/movie-list/original-movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MovieListComponent implements OnDestroy {
  public movies: Movie[] = this.movieService.getMovies();

  public isSuperUser: boolean = false;
  public showAdminButton: boolean = false;

  public searchText: string = '';
  private searchTextSubject = new Subject<string>();
  private readonly searchTextSubscription: Subscription | undefined;

  constructor(
    private readonly movieService: MovieService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
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


  public onSearchTextChange(text: string) {
    this.searchTextSubject.next(text);
  }

  public filterMovies(searchText: string) {
    if (!searchText) {
      this.movies = this.movieService.getMovies();
      return;
    }

    this.movies = this.movieService.getMovies().filter(movie => {
      return movie.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  public openModal(avatarUrl: string) {
    this.dialog.open(AvatarModalComponent, {
      data: {avatarUrl},
    });
  }


  ngOnDestroy() {
    if (this.searchTextSubscription) {
      this.searchTextSubscription.unsubscribe();
    }
  }


  public toggleAdminButton() {
    this.showAdminButton = this.isSuperUser;
  }

  public redirectToAdmin() {
    this.router.navigate(['/admin']);
  }
}

