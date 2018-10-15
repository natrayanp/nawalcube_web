import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevloginComponent } from './devlogin.component';

describe('DevloginComponent', () => {
  let component: DevloginComponent;
  let fixture: ComponentFixture<DevloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
