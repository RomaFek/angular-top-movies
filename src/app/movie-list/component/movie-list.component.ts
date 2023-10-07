import {Component} from '@angular/core';
import {Movie} from 'src/app/movie-list/models/movie.model';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
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
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
    public adminCheck!: FormGroup;
    public searchMovie!: FormGroup;
    public movies: Movie[] = this.movieService.getMovies();
    public showAdminButton: boolean = false;

    // public searchText: string = '';
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

        this.searchTextSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .pipe(takeUntil(this.destroy$)).subscribe(searchText => {
            this.filterMovies(searchText);
        });

        this.searchMovie.get('searchText')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
            this.searchTextSubject.next(text);
        });
    }

    public filterMovies(searchText: string) {
        if (!searchText) {
            this.movies = this.movieService.getMovies();
            return;
        }

        this.movies = this.movieService.getMovies().filter(movie => {
            return movie.title.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    public openModal(avatarUrl: string) {
        this.dialog.open(AvatarModalComponent, {
            data: {avatarUrl},
        });
    }

    public toggleAdminButton() {
        this.showAdminButton = this.adminCheck.get('isSuperUser')?.value;
    }

    public redirectToAdmin() {
        this.router.navigate(['/component']);
    }
}
