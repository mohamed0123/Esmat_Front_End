import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRepeaterComponent } from './item-repeater.component';

describe('ItemRepeaterComponent', () => {
  let component: ItemRepeaterComponent;
  let fixture: ComponentFixture<ItemRepeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRepeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRepeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
