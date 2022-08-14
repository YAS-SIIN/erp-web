import { TestBed } from '@angular/core/testing';

import { UsersRolesService } from './users-roles.service';

describe('UsersRolesService', () => {
  let service: UsersRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
