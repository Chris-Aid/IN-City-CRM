import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoverviewComponent } from './eventoverview.component';

describe('EventoverviewComponent', () => {
  let component: EventoverviewComponent;
  let fixture: ComponentFixture<EventoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
