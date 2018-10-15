import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlgerrComponent } from './devlgerr.component';

describe('DevlgerrComponent', () => {
  let component: DevlgerrComponent;
  let fixture: ComponentFixture<DevlgerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevlgerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevlgerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
