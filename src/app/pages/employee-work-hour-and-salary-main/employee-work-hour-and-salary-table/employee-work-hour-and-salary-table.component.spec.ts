import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkHourAndSalaryTableComponent } from './employee-work-hour-and-salary-table.component';

describe('EmployeeWorkHourAndSalaryTableComponent', () => {
  let component: EmployeeWorkHourAndSalaryTableComponent;
  let fixture: ComponentFixture<EmployeeWorkHourAndSalaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkHourAndSalaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkHourAndSalaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
