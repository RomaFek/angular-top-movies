import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Movie} from 'src/app/movie-list/models/movie.model';
import {debounceTime, distinctUntilChanged, Observable, of, startWith, Subject, switchMap, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AvatarModalComponent} from '../../avatar-modal/avatar-modal.component';
import {Router} from '@angular/router';
import {MovieService} from 'src/app/movie-list/service/original-movie.service';
import {FormControl, FormGroup} from "@angular/forms";
import {DestroyService} from "../../shared/service/destroy.service";

@Component({
    selector: 'app-movie-item-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
    public adminCheck!: FormGroup<{ isSuperUser: FormControl<boolean | null> }>;
    public searchMovie!: FormGroup<{ searchText: FormControl<string | null> }>;
    public movies$: Observable<Movie[]>
    public showAdminButton: boolean | null = false;
    private searchTextSubject = new Subject<string>();

    constructor(
        private readonly movieService: MovieService,
        private readonly dialog: MatDialog,
        private readonly router: Router,
        private destroy$: DestroyService
    ) {
        this.adminCheck = new FormGroup({
            isSuperUser: new FormControl(false),
        });

        this.searchMovie = new FormGroup({
            searchText: new FormControl(''),
        });
        this.movies$ = this.searchTextSubject.pipe(
            startWith(''),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(searchText => {
                if (!searchText) {
                    return of(this.movieService.getMovies());
                }
                return of(this.movieService.getMovies().filter(movie => {
                    return movie.title.toLowerCase().includes(searchText.toLowerCase());
                }));
            }),
        );

        this.searchMovie.controls.searchText.valueChanges.pipe(
            takeUntil(this.destroy$)
        )
            .subscribe(searchText => {
                this.searchTextSubject.next(searchText as string);
            });

    }

    public openModal(avatarUrl: string) {
        this.dialog.open(AvatarModalComponent, {
            data: {avatarUrl},
        });
    }

    public toggleAdminButton() {
        this.showAdminButton = this.adminCheck.controls.isSuperUser.value;

    }

    public redirectToAdmin() {
        this.router.navigate(['/component']);
    }
}
