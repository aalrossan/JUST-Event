import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvaluationPage } from './create-evaluation.page';

describe('CreateEvaluationPage', () => {
  let component: CreateEvaluationPage;
  let fixture: ComponentFixture<CreateEvaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEvaluationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEvaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
