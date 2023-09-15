import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../original-movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: Movie = {
    id: this.route.snapshot.params['id'],
    title: '',
    posterUrl: '',
    rating: 0,
    description: '',
    hasAward: false,
    awards: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.movie.awards = [];
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];

    this.movieService.getMovieById(movieId).subscribe((data: Movie | undefined) => {
      if (data) {
        this.movie = data;
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
      this.movieService.editMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie.id]);
      });
    } else {
      this.movie.awards = [];
      this.movieService.editMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie.id]);
      });

    }
  }
}
