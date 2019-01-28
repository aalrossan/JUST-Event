import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAllocationPage } from './services-allocation.page';

describe('ServicesAllocationPage', () => {
  let component: ServicesAllocationPage;
  let fixture: ComponentFixture<ServicesAllocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAllocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAllocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
