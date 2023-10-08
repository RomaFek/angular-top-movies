import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Movie} from '../movie-list/models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from 'src/app/movie-list/service/original-movie.service';
import {DestroyService} from "../shared/service/destroy.service";
import {map, Observable, switchMap, takeUntil} from "rxjs";

@Component({
    selector: 'app-movie-item',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
    public movie$!: Observable<Movie | undefined>;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private router: Router,
        private destroy$: DestroyService,
    ) {
    }


    ngOnInit() {
        this.movie$ = this.route.params.pipe(
            map(movieId => +movieId['id']),
            switchMap(movieId => this.movieService.getMovieById(movieId)),
        );
    }

    public editMovie() {
        this.movie$.pipe(takeUntil(this.destroy$)).subscribe(movie => {
            if (movie) {
                this.router.navigate(['/editmovie', movie.id]);
            }
        });
    }

}
