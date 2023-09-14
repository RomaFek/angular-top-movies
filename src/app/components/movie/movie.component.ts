import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/original-movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie | undefined

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movieService.getMovieById(movieId).subscribe(
        (movie: Movie | undefined) => {
          this.movie = movie;
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
}
