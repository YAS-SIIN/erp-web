import { TestBed } from '@angular/core/testing';

import { RequestLeaveService } from './request-leave.service';

describe('RequestLeaveService', () => {
  let service: RequestLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
