import {Injectable} from '@angular/core';
import {Movie, originalMovies} from '../models/movie.model';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private localStorageKey = 'movies';
    public originalMovies: Movie[] = originalMovies

    constructor() {
        const moviesFromLocalStorage = localStorage.getItem(this.localStorageKey);
        if (moviesFromLocalStorage) {
            this.originalMovies = JSON.parse(moviesFromLocalStorage);
        }
    }

    public getMovies(): Movie[] {
        return this.originalMovies;
    }

    public getMovieById(id: number): Observable<Movie | undefined> {
        return of(this.originalMovies.find(movie => movie.id == id))
    }

    public editMovie(movie: Movie): Observable<void> {
        this.saveMoviesToLocalStorage();
        return of(undefined);

    }

    public saveMoviesToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.originalMovies));
    }
}
