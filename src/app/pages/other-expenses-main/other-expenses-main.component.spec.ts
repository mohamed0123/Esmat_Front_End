import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesMainComponent } from './other-expenses-main.component';

describe('OtherExpensesMainComponent', () => {
  let component: OtherExpensesMainComponent;
  let fixture: ComponentFixture<OtherExpensesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExpensesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExpensesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
