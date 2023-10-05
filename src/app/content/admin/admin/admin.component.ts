import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {
  public loaded = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }
}
