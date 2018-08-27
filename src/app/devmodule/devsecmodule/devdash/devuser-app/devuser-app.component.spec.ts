import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevuserAppComponent } from './devuser-app.component';

describe('DevuserAppComponent', () => {
  let component: DevuserAppComponent;
  let fixture: ComponentFixture<DevuserAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevuserAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevuserAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
