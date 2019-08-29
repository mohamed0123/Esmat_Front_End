import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesCreateComponent } from './purchases-create.component';

describe('PurchasesCreateComponent', () => {
  let component: PurchasesCreateComponent;
  let fixture: ComponentFixture<PurchasesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
