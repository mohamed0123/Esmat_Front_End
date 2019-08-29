import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesMainComponent } from './purchases-main.component';

describe('PurchasesMainComponent', () => {
  let component: PurchasesMainComponent;
  let fixture: ComponentFixture<PurchasesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
