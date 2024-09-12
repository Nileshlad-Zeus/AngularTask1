import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']

})
export class CreateQuestionComponent implements AfterViewInit {

  questionData = {
    question: '',
    textPhrase: '',
    responses: [{ response: '' }]
  };

  responses: string[] = [];
  tokan: string[] = [];
  draggedResponse: string = '';

  tempresponse: string = '';

  @ViewChild('textAreaElement') textAreaElement!: ElementRef;
  @ViewChild('draggableElement') draggableElement!: ElementRef;
  @ViewChild('questionlabel') questionlabel!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private questionService: QuestionService
  ) {

  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    const draggable = this.draggableElement.nativeElement;
    this.renderer.listen(draggable, 'dragover', (e: DragEvent) => {
      e.preventDefault();
    });


    this.renderer.listen(draggable, 'drop', (e: DragEvent) => {
      e.preventDefault();
      const droppedData = e.dataTransfer?.getData('text/plain');
      if (droppedData && e.target instanceof HTMLElement) {
        e.target.innerText = droppedData;
      }
    });
  }

  addResponse() {
    this.questionData.responses.push({ response: '' });
    this.responses.push(this.tempresponse);
    console.log(this.tempresponse);
  }

  onResponseChange(value: string) {
    this.tempresponse = value;
  }

  onResponseChangeQuestion(value: string) {
    if (value) {
      this.renderer.setStyle(this.questionlabel.nativeElement, 'transform', 'translateY(-20px)');
      this.renderer.setStyle(this.questionlabel.nativeElement, 'font-size', '12px');
    } else {
      this.renderer.removeStyle(this.questionlabel.nativeElement, 'transform');
      this.renderer.removeStyle(this.questionlabel.nativeElement, 'font-size');
    }
  }


  removeResponse(index: number) {
    this.questionData.responses.splice(index, 1);
    this.responses.splice(index, 1);
  }

  saveQuestion() {
    this.questionService.addQuestion(this.questionData);
    // this.resetQuestion();
  }

  resetQuestion() {
    // this.questionData = {
    //   question: '',
    //   textPhrase: '',
    //   responses: [{ response: '' }]
    // };

    // this.responses = []

    // const textArea = this.textAreaElement.nativeElement as HTMLDivElement;
    // textArea.innerHTML="";
  }

  addToken() {
    const textArea = this.textAreaElement.nativeElement as HTMLDivElement;
    const token = document.createElement('span');
    token.textContent = 'Token';
    token.className = 'token';
    token.setAttribute("contenteditable", "false");
    token.style.backgroundColor = '#2222221F';
    token.style.width = '80px';
    token.style.height = '24px';
    token.style.border = 'none';
    token.style.display = "inline-flex"
    token.style.alignItems = "center";
    token.style.justifyContent = "center";
    token.style.boxSizing = 'border-box';
    token.style.marginRight = "8px"
    token.style.marginLeft = "8px"

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);




    if (range) {
      range.deleteContents();
      range.insertNode(token);
      const space = document.createTextNode(' ');
      range.insertNode(space);

      const newRange = document.createRange();
      newRange.setStartAfter(space);
      newRange.setEndAfter(space);

      selection?.removeAllRanges();
      selection?.addRange(newRange);
    }
    setTimeout(() => {
      textArea.focus();
    }, 0);
    this.updateTextPhrase()
  }



  drag(event: DragEvent, response: string) {
    this.draggedResponse = response;
    event.dataTransfer?.setData('text/plain', response);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, tokenIndex: number) {
    event.preventDefault();
    this.tokan[tokenIndex] = this.draggedResponse;
  }

  updateTextPhrase() {
    const textArea = this.textAreaElement.nativeElement as HTMLDivElement;
    this.questionData.textPhrase = textArea.innerHTML;
  }

  getData() {
    console.log("GET DATA");
    console.log(this.questionService.getQuestions())
  }
}