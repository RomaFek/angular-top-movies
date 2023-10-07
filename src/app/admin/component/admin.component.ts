import {AfterViewInit, Component} from '@angular/core';
import {Observable, of, takeUntil} from "rxjs";
import {delay} from "rxjs/operators";
import {DestroyService} from "../../shared/service/destroy.service";

@Component({
    selector: 'app-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    providers: [DestroyService],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements AfterViewInit {
    public loaded = false;

    public constructor(private destroy$: DestroyService) {
    }

    ngAfterViewInit() {
        const loader: Observable<boolean> = of(this.loaded).pipe(delay(2000));

        loader.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.loaded = true;
        });
    }
}
