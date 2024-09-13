import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


interface CorrectAnswer {
  id: string;
  ans: string;
}

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
  tempcorrectAns: CorrectAnswer[] = [];
  correctAns: CorrectAnswer[] = [];

  sanitizedTextPhrase!: SafeHtml;

  @ViewChild('draggableElement') draggableElement!: ElementRef;

  constructor(private questionService: QuestionService, private renderer: Renderer2, private sanitizer: DomSanitizer) { }


  cleanHTML(html: string): string {
    const noStyleTags = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    const noInlineStyles = noStyleTags.replace(/ style="[^"]*"/gi, '');

    return noInlineStyles;
  }


  ngOnInit() {
    this.previewQuestionTemp = JSON.parse(localStorage.getItem("previewQuestion")!);
    this.questionData = this.questionService.getPreviewQuestion() || this.previewQuestionTemp;
    console.log(this.questionData);

    this.question = this.questionData?.question;
    this.textPhrase = this.questionData?.textPhrase;
    this.sanitizedTextPhrase = this.sanitizer.bypassSecurityTrustHtml(this.cleanHTML(this.questionData?.textPhrase || ''));
    this.correctAns = this.questionData.correctAns;
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

      if (droppedData && e.target instanceof HTMLElement) {
        this.tempcorrectAns.push({
          id: e.target.id,
          ans: droppedData
        })
        e.target.innerText = droppedData;
      }
    });
  }

  drag(event: DragEvent, response: string) {
    event.dataTransfer?.setData('text/plain', response);
  }

  checkAns() {
    const matchedAnswers = this.correctAns.filter(correctItem => {
      return this.tempcorrectAns.some(tempItem =>
        tempItem.id === correctItem.id && tempItem.ans === correctItem.ans
      );
    });

    const notMatchedAnswers = this.correctAns.filter(correctItem => {
      return !this.tempcorrectAns.some(tempItem =>
        tempItem.id === correctItem.id && tempItem.ans === correctItem.ans
      );
    });

    matchedAnswers.forEach((ele) => {
      console.log(ele.id);
      let eleMent = document.getElementById(ele.id);

      if (eleMent) {
        eleMent.style.border = "1px solid #035800";
        eleMent.classList.add("checkAnsStatus")
        let greenDiv = document.createElement("div");
        greenDiv.style.backgroundColor = "#1F7A54";
        let span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = "check";
        greenDiv.appendChild(span);
        eleMent.appendChild(greenDiv);
      } else {
        console.log(`Element with id ${ele.id} not found`);
      }
    })

    notMatchedAnswers.forEach((ele) => {
      console.log(ele.id);
      let eleMent = document.getElementById(ele.id);

      if (eleMent) {
        eleMent.style.border = "1px solid #B00020";
        eleMent.classList.add("checkAnsStatus")
        let greenDiv = document.createElement("div");
        greenDiv.style.backgroundColor = "#B00020";
        let span = document.createElement("span");
        span.className = "material-symbols-outlined";
        span.textContent = "close";
        greenDiv.appendChild(span);
        eleMent.appendChild(greenDiv);

      } else {
        console.log(`Element with id ${ele.id} not found`);
      }
    })
    // console.log(matchedAnswers);

  }
}
