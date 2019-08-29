import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkHourAndSalaryMainComponent } from './employee-work-hour-and-salary-main.component';

describe('EmployeeWorkHourAndSalaryMainComponent', () => {
  let component: EmployeeWorkHourAndSalaryMainComponent;
  let fixture: ComponentFixture<EmployeeWorkHourAndSalaryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkHourAndSalaryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkHourAndSalaryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
