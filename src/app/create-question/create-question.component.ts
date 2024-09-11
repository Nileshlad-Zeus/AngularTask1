import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  formattedText: string = "";

  responses: string[] = [""];
  tokan: string[] = [];
  draggedResponse: string = '';

  @ViewChild('textAreaElement') textAreaElement!: ElementRef;
  @ViewChild('draggableElement') draggableElement!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {

  }

  ngAfterViewInit() {
    const draggable = this.draggableElement.nativeElement;
    console.log(draggable);
    // this.renderer.listen(draggable, 'click', (e) => {
    //   console.log('Draggable element clicked!');
    //   console.log(e.target)
    // });

    this.renderer.listen(draggable, 'dragover', (e: DragEvent) => {
      e.preventDefault();
    });


    this.renderer.listen(draggable, 'drop', (e: DragEvent) => {
      console.log("Drop");

      e.preventDefault();
      const droppedData = e.dataTransfer?.getData('text/plain');
      if (droppedData && e.target instanceof HTMLElement) {
        e.target.innerText = droppedData;
        console.log(droppedData)
        // const span = this.renderer.createElement('span');
        // const text = this.renderer.createText(droppedData);

        // this.renderer.appendChild(span, text);
      }
    });
  }

  addResponse() {
    this.questionData.responses.push({ response: '' });
    this.responses.push('');
  }

  onResponseChange(value: string, index: number) {
    this.responses[index] = value;
  }


  removeResponse(index: number) {
    this.questionData.responses.splice(index, 1);
    this.responses.splice(index, 1);
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
    console.log(this.draggableElement.nativeElement)
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
}











// getFormattedText(): SafeHtml {
//   let tokenCounter = 0;
//   const rawHtml = this.questionData.textPhrase.replace(/\[TOKEN\]/g, () => {
//     const tokenValue = this.tokan[tokenCounter] || `Token ${tokenCounter + 1}`;
//     const tokenHtml = `<span
//       class="token" style="
//         background-color: #FFFFFF;
//         width: 90px;
//         height: 32px;
//         border: 1px dashed rgba(0, 0, 0, 0.77);
//         display: inline-block;
//         text-align: center;
//         line-height: 32px;
//         box-sizing: border-box;
//         position: relative;
//         top: 10px"
//         id="token-${tokenCounter}"
//           (dragover)="allowDrop($event)"
//         (drop)="drop($event, i)"
//         >
//         ${tokenValue}
//       </span>`;

//     tokenCounter++;
//     return tokenHtml;
//   });
//   return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
// }