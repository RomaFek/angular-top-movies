import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../original-movie.service';
import { Movie } from 'src/app/models/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMovieComponent implements OnInit, OnDestroy {
  movie: Movie = {
    id: this.route.snapshot.params['id'],
    title: '',
    posterUrl: '',
    rating: 0,
    description: '',
    hasAward: false,
    awards: []
  };

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

  toggleAwards() {
    if (this.movie.hasAward) {
      this.movie.awards = [];
    }
  }

  addAward(): void {
    this.movie.awards.push('');
  }

  onSubmit(): void {
    if (this.movie.hasAward) {
      this.movieSubscription = this.movieService.editMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie.id]);
      });
    } else {
      this.movie.awards = [];
      this.movieSubscription = this.movieService.editMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie.id]);
      });
    }
  }

  ngOnDestroy() {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
