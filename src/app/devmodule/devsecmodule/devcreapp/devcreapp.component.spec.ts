import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevcreappComponent } from './devcreapp.component';

describe('DevcreappComponent', () => {
  let component: DevcreappComponent;
  let fixture: ComponentFixture<DevcreappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevcreappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevcreappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
