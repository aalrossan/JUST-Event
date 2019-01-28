import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountPage } from './student-account.page';

describe('StudentAccountPage', () => {
  let component: StudentAccountPage;
  let fixture: ComponentFixture<StudentAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
