import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevavailappComponent } from './devavailapp.component';

describe('DevavailappComponent', () => {
  let component: DevavailappComponent;
  let fixture: ComponentFixture<DevavailappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevavailappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevavailappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
