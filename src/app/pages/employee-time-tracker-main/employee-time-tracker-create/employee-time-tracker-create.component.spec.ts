import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeTrackerCreateComponent } from './employee-time-tracker-create.component';

describe('EmployeeTimeTrackerCreateComponent', () => {
  let component: EmployeeTimeTrackerCreateComponent;
  let fixture: ComponentFixture<EmployeeTimeTrackerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTimeTrackerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimeTrackerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
