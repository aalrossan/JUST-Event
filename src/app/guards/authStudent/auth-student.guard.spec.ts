import { TestBed, async, inject } from '@angular/core/testing';

import { AuthStudentGuard } from './auth-student.guard';

describe('AuthStudentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStudentGuard]
    });
  });

  it('should ...', inject([AuthStudentGuard], (guard: AuthStudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
