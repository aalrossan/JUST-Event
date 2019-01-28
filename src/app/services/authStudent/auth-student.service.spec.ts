import { TestBed } from '@angular/core/testing';

import { AuthStudentService } from './auth-student.service';

describe('AuthStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStudentService = TestBed.get(AuthStudentService);
    expect(service).toBeTruthy();
  });
});
