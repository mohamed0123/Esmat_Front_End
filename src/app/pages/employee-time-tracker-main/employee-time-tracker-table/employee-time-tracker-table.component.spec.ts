import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeTrackerTableComponent } from './employee-time-tracker-table.component';

describe('EmployeeTimeTrackerTableComponent', () => {
  let component: EmployeeTimeTrackerTableComponent;
  let fixture: ComponentFixture<EmployeeTimeTrackerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTimeTrackerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimeTrackerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
