import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedCreateTableComponent } from './deceased-create-table.component';

describe('DeceasedCreateTableComponent', () => {
  let component: DeceasedCreateTableComponent;
  let fixture: ComponentFixture<DeceasedCreateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeceasedCreateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
