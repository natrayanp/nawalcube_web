import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevuserAppCardComponent } from './devuser-app-card.component';

describe('DevuserAppCardComponent', () => {
  let component: DevuserAppCardComponent;
  let fixture: ComponentFixture<DevuserAppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevuserAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevuserAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
