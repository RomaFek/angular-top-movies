import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../movie-list/service/original-movie.service';
import {Movie} from 'src/app/movie-list/models/movie.model';
import {FormControl, FormGroup} from "@angular/forms";
import {DestroyService} from "../shared/service/destroy.service";
import {takeUntil} from "rxjs";

@Component({
    selector: 'app-edit-movie-item',
    templateUrl: './edit-movie.component.html',
    styleUrls: ['./edit-movie.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMovieComponent implements OnInit {
    public editForm!: FormGroup<{
        title: FormControl<string | null>;
        posterUrl: FormControl<string | null>;
        rating: FormControl<number | null>;
        description: FormControl<string | null>;
        hasAward: FormControl<boolean | null>;
        awards: FormControl<string[] | null>;
        tempAward: FormControl<string | null>;
    }>
    public movie!: Movie

    public tempAward: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService,
        private destroy$: DestroyService,
    ) {

    }

    private _createForm() {
        this.editForm = new FormGroup({
            title: new FormControl(this.movie.title),
            posterUrl: new FormControl(this.movie.posterUrl),
            rating: new FormControl(this.movie.rating),
            description: new FormControl(this.movie.description),
            hasAward: new FormControl(this.movie.hasAward),
            awards: new FormControl(this.movie.awards),
            tempAward: new FormControl({value: '', disabled: !this.movie.hasAward})
        })
    }

    ngOnInit(): void {
        const movieId = this.route.snapshot.params['id'];
        this.movieService.getMovieById(movieId).pipe(takeUntil(this.destroy$)).subscribe((data: Movie | undefined) => {
            if (data) {
                this.movie = data;
                this._createForm()
            } else {
                console.log('Фильм не найден');
            }
        });
        this.editForm.get('hasAward')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: boolean | null) => {
            if (value !== null) {
                if (value) {
                    this.editForm.controls.tempAward.enable();
                } else {
                    this.editForm.controls.tempAward.disable();
                }
            }
        });
    }

    public addAward(): void {
        const tempAwardValue = this.editForm.controls.tempAward.value;
        if (tempAwardValue !== null && tempAwardValue !== undefined) {
            this.tempAward = tempAwardValue;
            this.movie.awards.push(this.tempAward);
            this.tempAward = '';
        }
    }


    public onSubmit(): void {
        this.movie.title = this.editForm.controls.title.value as string;
        this.movie.posterUrl = this.editForm.controls.posterUrl.value as string;
        this.tempAward = this.editForm.controls.tempAward.value as string;
        this.movie.description = this.editForm.controls.description.value as string;
        const ratingValue = this.editForm.controls.rating.value;
        this.movie.rating = typeof ratingValue === 'number' ? ratingValue : 0;
        const hasAwardValue = this.editForm.controls.hasAward.value;
        this.movie.hasAward = typeof hasAwardValue === 'boolean' ? hasAwardValue : false;
        if (!this.movie.hasAward) {
            this.movie.awards = [];
        }
        this.movieService.editMovie(this.movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/movies', this.movie.id]);
        });
    }
}
