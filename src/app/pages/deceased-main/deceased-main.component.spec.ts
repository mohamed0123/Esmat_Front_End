import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedMainComponent } from './deceased-main.component';

describe('DeceasedMainComponent', () => {
  let component: DeceasedMainComponent;
  let fixture: ComponentFixture<DeceasedMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeceasedMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
