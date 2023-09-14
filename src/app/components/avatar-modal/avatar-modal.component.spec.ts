import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarModalComponent } from './avatar-modal.component';

describe('AvatarModalComponent', () => {
  let component: AvatarModalComponent;
  let fixture: ComponentFixture<AvatarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarModalComponent]
    });
    fixture = TestBed.createComponent(AvatarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
