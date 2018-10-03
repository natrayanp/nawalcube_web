import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevdashadminComponent } from './devdashadmin.component';

describe('DevdashadminComponent', () => {
  let component: DevdashadminComponent;
  let fixture: ComponentFixture<DevdashadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevdashadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevdashadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
