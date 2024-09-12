import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';
@Component({
  selector: 'app-preview-question',
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss']
})
export class PreviewQuestionComponent implements OnInit, AfterViewInit {
  questionData: any;
  question: string = "";
  textPhrase: string = "";
  responses: any;

  @ViewChild('draggableElement') draggableElement!: ElementRef;

  constructor(private questionService: QuestionService, private renderer: Renderer2) { }

  ngOnInit() {
    this.questionData = this.questionService.getQuestions();
    this.question = this.questionData[0]?.question;
    this.textPhrase = this.questionData[0]?.textPhrase;
    this.responses = this.questionData[0].responses;
  }
  ngAfterViewInit() {
    const draggable = this.draggableElement.nativeElement;
    this.renderer.listen(draggable, 'dragover', (e: DragEvent) => {
      e.preventDefault();
    });


    this.renderer.listen(draggable, 'drop', (e: DragEvent) => {
      console.log("Drop");

      e.preventDefault();
      const droppedData = e.dataTransfer?.getData('text/plain');
      console.log(droppedData);

      if (droppedData && e.target instanceof HTMLElement) {
        e.target.innerText = droppedData;
      }
    });
  }

  drag(event: DragEvent, response: string) {
    event.dataTransfer?.setData('text/plain', response);
  }
}
