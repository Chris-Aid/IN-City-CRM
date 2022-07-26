import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetTerminationComponent } from './set-termination.component';

describe('SetTerminationComponent', () => {
  let component: SetTerminationComponent;
  let fixture: ComponentFixture<SetTerminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTerminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
