import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardDialogComponent } from './customer-card-dialog.component';

describe('CustomerCardDialogComponent', () => {
  let component: CustomerCardDialogComponent;
  let fixture: ComponentFixture<CustomerCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
