import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlandComponent } from './devland.component';

describe('DevlandComponent', () => {
  let component: DevlandComponent;
  let fixture: ComponentFixture<DevlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
