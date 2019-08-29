import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeceasedCreateComponent } from './deceased-create.component';

describe('DeceasedCreateComponent', () => {
  let component: DeceasedCreateComponent;
  let fixture: ComponentFixture<DeceasedCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeceasedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeceasedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
