import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginManagerPage } from './login-manager.page';

describe('LoginManagerPage', () => {
  let component: LoginManagerPage;
  let fixture: ComponentFixture<LoginManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginManagerPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
