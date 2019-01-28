import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvaluationEventPage } from './show-evaluation-event.page';

describe('ShowEvaluationEventPage', () => {
  let component: ShowEvaluationEventPage;
  let fixture: ComponentFixture<ShowEvaluationEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowEvaluationEventPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvaluationEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
