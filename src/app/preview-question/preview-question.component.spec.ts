import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestionComponent } from './preview-question.component';

describe('PreviewQuestionComponent', () => {
  let component: PreviewQuestionComponent;
  let fixture: ComponentFixture<PreviewQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewQuestionComponent]
    });
    fixture = TestBed.createComponent(PreviewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
