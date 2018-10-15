import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevhomeComponent } from './devhome.component';

describe('DevhomeComponent', () => {
  let component: DevhomeComponent;
  let fixture: ComponentFixture<DevhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
