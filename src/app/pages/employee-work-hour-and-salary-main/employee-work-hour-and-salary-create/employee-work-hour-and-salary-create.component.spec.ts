import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkHourAndSalaryCreateComponent } from './employee-work-hour-and-salary-create.component';

describe('EmployeeWorkHourAndSalaryCreateComponent', () => {
  let component: EmployeeWorkHourAndSalaryCreateComponent;
  let fixture: ComponentFixture<EmployeeWorkHourAndSalaryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkHourAndSalaryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkHourAndSalaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
