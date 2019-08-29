import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeTrackerMainComponent } from './employee-time-tracker-main.component';

describe('EmployeeTimeTrackerMainComponent', () => {
  let component: EmployeeTimeTrackerMainComponent;
  let fixture: ComponentFixture<EmployeeTimeTrackerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTimeTrackerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimeTrackerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
