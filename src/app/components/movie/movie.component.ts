import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/original-movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | undefined;
  private movieSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.movieSubscription = this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movieService.getMovieById(movieId).subscribe(
        (movie: Movie | undefined) => {
          this.movie = movie;
          this.cdr.markForCheck(); 
        },
        (error) => {
          console.error('Ошибка при получении фильма:', error);
        }
      );
    });
  }

  editMovie() {
    this.movie && (this.router.navigate(['/editmovie', this.movie.id]))
  }

  ngOnDestroy() {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
