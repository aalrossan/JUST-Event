import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEventPage } from './modify-event.page';

describe('ModifyEventPage', () => {
  let component: ModifyEventPage;
  let fixture: ComponentFixture<ModifyEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyEventPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
