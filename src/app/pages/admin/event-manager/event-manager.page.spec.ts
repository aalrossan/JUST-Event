import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagerPage } from './event-manager.page';

describe('EventManagerPage', () => {
  let component: EventManagerPage;
  let fixture: ComponentFixture<EventManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventManagerPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
