import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulBookingComponent } from './successful-booking.component';

describe('SuccessfulBookingComponent', () => {
  let component: SuccessfulBookingComponent;
  let fixture: ComponentFixture<SuccessfulBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
