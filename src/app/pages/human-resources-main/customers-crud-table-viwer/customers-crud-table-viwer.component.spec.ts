import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCrudTableViwerComponent } from './customers-crud-table-viwer.component';

describe('CustomersCrudTableViwerComponent', () => {
  let component: CustomersCrudTableViwerComponent;
  let fixture: ComponentFixture<CustomersCrudTableViwerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersCrudTableViwerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCrudTableViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
