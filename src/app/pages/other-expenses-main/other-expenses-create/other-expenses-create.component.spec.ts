import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesCreateComponent } from './other-expenses-create.component';

describe('OtherExpensesCreateComponent', () => {
  let component: OtherExpensesCreateComponent;
  let fixture: ComponentFixture<OtherExpensesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExpensesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExpensesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
