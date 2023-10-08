import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
    selector: 'app-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
    public loaded$: Observable<boolean> = of(false);


    ngOnInit() {
        this.loaded$ = of(true).pipe(delay(2000));
    }
}
