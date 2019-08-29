import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersOfproductfittingsCreateTableComponent } from './manufacturers-ofproductfittings-create-table.component';

describe('ManufacturersOfproductfittingsCreateTableComponent', () => {
  let component: ManufacturersOfproductfittingsCreateTableComponent;
  let fixture: ComponentFixture<ManufacturersOfproductfittingsCreateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturersOfproductfittingsCreateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturersOfproductfittingsCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
