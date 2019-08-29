import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesTableComponent } from './other-expenses-table.component';

describe('OtherExpensesTableComponent', () => {
  let component: OtherExpensesTableComponent;
  let fixture: ComponentFixture<OtherExpensesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExpensesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExpensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
