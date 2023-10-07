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
    public editForm!: FormGroup
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
    }

    public toggleTempAward(): void {
        const hasAwardControl = this.editForm.get('hasAward');

        if (hasAwardControl?.value) {
            this.editForm.get('tempAward')?.enable();
        } else {
            this.editForm.get('tempAward')?.disable();
        }
    }

    public addAward(): void {
        this.tempAward = this.editForm.get('tempAward')?.value;
        if (this.tempAward) {
            this.movie.awards.push(this.tempAward);
            this.tempAward = '';
        }
    }


    public onSubmit(): void {
        this.movie.title = this.editForm.get('title')?.value;
        this.movie.posterUrl = this.editForm.get('posterUrl')?.value;
        this.movie.rating = this.editForm.get('rating')?.value;
        this.movie.description = this.editForm.get('description')?.value;
        this.movie.hasAward = this.editForm.get('hasAward')?.value;
        this.tempAward = this.editForm.get('tempAward')?.value;
        if (!this.movie.hasAward) {
            this.movie.awards = [];
        }
        this.movieService.editMovie(this.movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/movies', this.movie.id]);
        });
    }
}
