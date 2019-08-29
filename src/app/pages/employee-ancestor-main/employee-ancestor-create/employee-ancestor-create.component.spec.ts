import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAncestorCreateComponent } from './employee-ancestor-create.component';

describe('EmployeeAncestorCreateComponent', () => {
  let component: EmployeeAncestorCreateComponent;
  let fixture: ComponentFixture<EmployeeAncestorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAncestorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAncestorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
