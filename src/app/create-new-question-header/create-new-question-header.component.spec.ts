import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewQuestionHeaderComponent } from './create-new-question-header.component';

describe('CreateNewQuestionHeaderComponent', () => {
  let component: CreateNewQuestionHeaderComponent;
  let fixture: ComponentFixture<CreateNewQuestionHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewQuestionHeaderComponent]
    });
    fixture = TestBed.createComponent(CreateNewQuestionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
