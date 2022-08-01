import { TestBed } from '@angular/core/testing';

import { CartableService } from './cartable.service';

describe('CartableService', () => {
  let service: CartableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
