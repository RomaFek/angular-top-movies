import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../movie-models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from 'src/app/content/movie-list/original-movie.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit, OnDestroy {
  public movie: Movie | undefined;
  private movieSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }


  public ngOnInit() {
    this.movieSubscription = this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movieService.getMovieById(movieId).subscribe(
        (movie: Movie | undefined) => {
          this.movie = movie;
          this.cdr.markForCheck();
        }
      );
    });
  }

  public editMovie() {
    this.movie && (this.router.navigate(['/editmovie', this.movie.id]))
  }

  public ngOnDestroy() {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
