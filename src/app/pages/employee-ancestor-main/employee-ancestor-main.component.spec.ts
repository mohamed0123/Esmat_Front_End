import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAncestorMainComponent } from './employee-ancestor-main.component';

describe('EmployeeAncestorMainComponent', () => {
  let component: EmployeeAncestorMainComponent;
  let fixture: ComponentFixture<EmployeeAncestorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAncestorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAncestorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
