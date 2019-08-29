import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAncestorTableComponent } from './employee-ancestor-table.component';

describe('EmployeeAncestorTableComponent', () => {
  let component: EmployeeAncestorTableComponent;
  let fixture: ComponentFixture<EmployeeAncestorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAncestorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAncestorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
