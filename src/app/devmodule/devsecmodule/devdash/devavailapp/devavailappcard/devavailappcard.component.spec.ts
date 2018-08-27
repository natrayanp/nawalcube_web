import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevavailappcardComponent } from './devavailappcard.component';

describe('DevavailappcardComponent', () => {
  let component: DevavailappcardComponent;
  let fixture: ComponentFixture<DevavailappcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevavailappcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevavailappcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
