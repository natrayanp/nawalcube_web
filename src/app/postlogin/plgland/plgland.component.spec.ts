import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlglandComponent } from './plgland.component';

describe('PlglandComponent', () => {
  let component: PlglandComponent;
  let fixture: ComponentFixture<PlglandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlglandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlglandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
