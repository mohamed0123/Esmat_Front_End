import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesTableComponent } from './purchases-table.component';

describe('PurchasesTableComponent', () => {
  let component: PurchasesTableComponent;
  let fixture: ComponentFixture<PurchasesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
