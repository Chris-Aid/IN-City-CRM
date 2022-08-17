import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingCustomerDialogComponent } from './deleting-customer-dialog.component';

describe('DeletingCustomerDialogComponent', () => {
  let component: DeletingCustomerDialogComponent;
  let fixture: ComponentFixture<DeletingCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletingCustomerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletingCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
