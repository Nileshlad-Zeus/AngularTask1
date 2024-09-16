import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';

@Component({
  selector: 'app-create-new-question-header',
  templateUrl: './create-new-question-header.component.html',
  styleUrls: ['./create-new-question-header.component.scss']
})
export class CreateNewQuestionHeaderComponent implements OnInit {
  constructor(private questionService: QuestionService) { };
  ngOnInit() {

  }

  preview() {
    console.log("Preview Trigger");
    this.questionService.triggerSaveAndPreview();
  }
}
