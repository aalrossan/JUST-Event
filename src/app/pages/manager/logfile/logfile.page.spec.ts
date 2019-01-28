import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogfilePage } from './logfile.page';

describe('LogfilePage', () => {
  let component: LogfilePage;
  let fixture: ComponentFixture<LogfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogfilePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
