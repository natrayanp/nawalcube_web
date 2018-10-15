import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevdashComponent } from './devdash.component';

describe('DevdashComponent', () => {
  let component: DevdashComponent;
  let fixture: ComponentFixture<DevdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
