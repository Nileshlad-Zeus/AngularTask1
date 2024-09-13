import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


interface CorrectAnswer {
  id: string;
  ans: string;
}

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']

})

export class CreateQuestionComponent implements OnInit, AfterViewInit {

  questionData = {
    question: '',
    textPhrase: '',
    responses: [{ response: '' }],
    correctAns: [] as CorrectAnswer[]
  };
  private saveQuestionSubscription!: Subscription;
  private saveAndPreviewSubscription!: Subscription;

  responses: string[] = [];
  tokan: string[] = [];
  draggedResponse: string = '';

  tempresponse: string = '';
  sanitizedTextPhrase!: SafeHtml;

  @ViewChild('textAreaElement') textAreaElement!: ElementRef;
  @ViewChild('draggableElement') draggableElement!: ElementRef;
  @ViewChild('questionlabel') questionlabel!: ElementRef;


  constructor(
    private renderer: Renderer2,
    private questionService: QuestionService,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer
  ) {


  }
  ngOnInit() {
    this.saveQuestionSubscription = this.questionService.saveQuestionTriggered$.subscribe(() => {
      this.saveQuestion();
    });

    this.saveAndPreviewSubscription = this.questionService.saveAndPreviewTriggered$.subscribe(() => {
      this.saveAndPreview();
    });
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
        this.questionData.correctAns.push({
          id: e.target.id,
          ans: droppedData
        })
        e.target.innerText = droppedData;
      }
    });
  }

  addResponse() {
    this.questionData.responses.push({ response: '' });
    this.responses.push(this.tempresponse);
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
  }

  saveAndPreview() {
    this.questionService.setPreviewQuestion(this.questionData);
    localStorage.setItem("previewQuestion", JSON.stringify(this.questionData));
  }


  generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomNum}`;
  }

  addToken() {
    const textArea = this.textAreaElement.nativeElement as HTMLDivElement;
    const token = document.createElement('span');
    token.textContent = `Token`;
    token.className = "token";
    const uniqueId = this.generateUniqueId();
    token.setAttribute("id", uniqueId);
    token.setAttribute("contenteditable", "false");

    // Apply styles directly
    token.style.backgroundColor = '#2222221F';
    token.style.width = '80px';
    token.style.height = '24px';
    token.style.border = 'none';
    token.style.display = "inline-flex";
    token.style.alignItems = "center";
    token.style.justifyContent = "center";
    token.style.boxSizing = 'border-box';
    token.style.marginRight = "8px";
    token.style.marginLeft = "8px";

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    this.ngZone.run(() => {
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
    });

    setTimeout(() => {
      textArea.focus();
    }, 0);

    this.updateTextPhrase();
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

  cleanHTML(html: string): string {
    const noStyleTags = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    const noInlineStyles = noStyleTags.replace(/ style="[^"]*"/gi, '');
  
    return noInlineStyles;
  }
  updateTextPhrase() {
    const textArea = this.textAreaElement.nativeElement as HTMLDivElement;
    const rawHtml = textArea.innerHTML;
    // this.sanitizedTextPhrase = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    this.sanitizedTextPhrase = this.sanitizer.bypassSecurityTrustHtml(this.cleanHTML(rawHtml || ''));
    this.questionData.textPhrase = rawHtml;
  }

  getData() {
    console.log("GET DATA");
    console.log(this.questionService.getQuestions())
  }
}