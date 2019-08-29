import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersOfproductfittingsCreateComponent } from './manufacturers-ofproductfittings-create.component';

describe('ManufacturersOfproductfittingsCreateComponent', () => {
  let component: ManufacturersOfproductfittingsCreateComponent;
  let fixture: ComponentFixture<ManufacturersOfproductfittingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturersOfproductfittingsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturersOfproductfittingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
