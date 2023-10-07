import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Movie} from '../movie-list/models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from 'src/app/movie-list/service/original-movie.service';
import {DestroyService} from "../shared/service/destroy.service";
import {switchMap, takeUntil} from "rxjs";

@Component({
    selector: 'app-movie-item',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
    public movie!: Movie

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private router: Router,
        private destroy$: DestroyService,
    ) {
    }


    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => {
                const movieId = +params['id'];
                return this.movieService.getMovieById(movieId);
            })
        ).pipe(takeUntil(this.destroy$)).subscribe(
            (movie: Movie | undefined) => {
                if (movie) {
                    this.movie = movie;
                } else {
                    console.log('Фильм не найден');
                }
            }
        );
    }


    public editMovie() {
        this.router.navigate(['/editmovie', this.movie.id])
    }


}
