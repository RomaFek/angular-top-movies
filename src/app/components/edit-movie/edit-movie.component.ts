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
    awardTitle: ''
  };

  hasAwards: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  toggleAwards() {
    this.hasAwards = !this.hasAwards;
    if (!this.hasAwards) {
        this.movie.awardTitle = ''; // Сбросить название награды, если чекбокс "Награды" выключен
    }
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


  onSubmit(): void {
    this.movieService.editMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies', this.movie.id]);
    });
  }
}
