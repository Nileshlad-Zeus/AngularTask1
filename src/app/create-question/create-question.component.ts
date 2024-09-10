import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']

})
export class CreateQuestionComponent {

  questionData = {
    question: '',
    textPhrase: '',
    responses: [{ response: '' }]
  };
  formattedText: string = "";

  responses: string[] = ["responce1"];
  tokan: string[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '18px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  addResponse() {
    console.log(this.questionData);
    this.responses.push(`{response}`);
    this.questionData.responses.push({ response: '' });
  }

  removeResponse(index: number) {
    this.questionData.responses.splice(index, 1);
  }

  addToken(textArea: HTMLTextAreaElement) {
    const token = '[TOKEN]';
    const cursorPos = textArea.selectionStart;
    const textBefore = this.questionData.textPhrase.substring(0, cursorPos);
    const textAfter = this.questionData.textPhrase.substring(cursorPos);
    this.tokan.push(`token`)
    this.questionData.textPhrase = textBefore + token + textAfter;

    setTimeout(() => {
      textArea.selectionStart = textArea.selectionEnd = cursorPos + token.length;
      textArea.focus();
    }, 0);
  }

  getFormattedText(): SafeHtml {
    const rawHtml = this.questionData.textPhrase.replace(/\[TOKEN\]/g,
      `<span
      cdkDropList [cdkDropListData]="tokan" (cdkDropListDropped)="onDrop($event)"
       class="token" style="
  background-color: #FFFFFF;
  width: 90px;
  height: 32px;
  border: 1px dashed rgba(0, 0, 0, 0.77);
  display: inline-block; text-align: center; line-height: 32px; box-sizing: border-box; position:relative; top:10px"> </span>`);
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log("Droped");
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.responses)
    console.log(this.tokan)
  }
}
