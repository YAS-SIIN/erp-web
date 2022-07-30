import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLeaveComponent } from './request-leave.component'; 

describe('RequestLeaveComponent', () => {
  let component: RequestLeaveComponent;
  let fixture: ComponentFixture<RequestLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
