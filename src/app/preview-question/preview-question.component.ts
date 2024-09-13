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
  previewQuestionTemp: any;

  @ViewChild('draggableElement') draggableElement!: ElementRef;

  constructor(private questionService: QuestionService, private renderer: Renderer2) { }

  ngOnInit() {
    this.previewQuestionTemp = JSON.parse(localStorage.getItem("previewQuestion")!);
    this.questionData = this.questionService.getPreviewQuestion() || this.previewQuestionTemp;
    console.log(this.questionData);
    
    this.question = this.questionData?.question;
    this.textPhrase = this.questionData?.textPhrase;
    this.responses = this.questionData.responses;
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
