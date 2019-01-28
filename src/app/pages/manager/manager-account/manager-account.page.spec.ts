import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAccountPage } from './manager-account.page';

describe('ManagerAccountPage', () => {
  let component: ManagerAccountPage;
  let fixture: ComponentFixture<ManagerAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
