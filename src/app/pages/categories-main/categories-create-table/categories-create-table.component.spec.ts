import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCreateTableComponent } from './categories-create-table.component';

describe('CategoriesCreateTableComponent', () => {
  let component: CategoriesCreateTableComponent;
  let fixture: ComponentFixture<CategoriesCreateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCreateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
