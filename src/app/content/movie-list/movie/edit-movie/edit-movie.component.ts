import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../original-movie.service';
import {Movie} from 'src/app/content/movie-list/movie-models/movie.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMovieComponent implements OnInit, OnDestroy {
  public movie: Movie = {
    id: this.route.snapshot.params['id'],
    title: '',
    posterUrl: '',
    rating: 0,
    description: '',
    hasAward: false,
    awards: []
  };
  public tempAward: string = '';
  private movieSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private cdRef: ChangeDetectorRef
  ) {
    this.movie.awards = [];
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.movieSubscription = this.movieService.getMovieById(movieId).subscribe((data: Movie | undefined) => {
      if (data) {
        this.movie = data;
        this.cdRef.markForCheck();
      } else {
        console.log('Фильм не найден');
      }
    });
  }

  public addAward(): void {
    if (this.movie.hasAward) {
      if (this.tempAward) {
        this.movie.awards.push(this.tempAward);
        this.tempAward = '';
      }
    }
  }


  private editMovieAndNavigate(): void {
    this.movieSubscription = this.movieService.editMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies', this.movie.id]);
    });
  }

  public onSubmit(): void {
    if (!this.movie.hasAward) {
      this.movie.awards = [];
    }
    this.editMovieAndNavigate();
  }


  public ngOnDestroy() {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
