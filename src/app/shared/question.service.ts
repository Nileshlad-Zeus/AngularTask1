import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface QuestionData {
  question: string;
  textPhrase: string;
  responses: { response: string }[];
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // private questions: QuestionData[] = [];
  private questions: QuestionData[] = []
  private previewQuestion: any;

  constructor() { }

  private saveQuestionTrigger = new Subject<void>();
  saveQuestionTriggered$ = this.saveQuestionTrigger.asObservable();

  private saveAndPreviewTrigger = new Subject<void>();
  saveAndPreviewTriggered$ = this.saveAndPreviewTrigger.asObservable();

  triggerSaveQuestion() {
    this.saveQuestionTrigger.next();
  }

  triggerSaveAndPreview() {
    this.saveAndPreviewTrigger.next();
  }

  
  setPreviewQuestion(data: QuestionData) {
    this.previewQuestion = data;
  }

  getPreviewQuestion() {
    return this.previewQuestion;
  }


  getQuestions(): QuestionData[] {
    return this.questions;
  }

  getQuestion(index: number): QuestionData | undefined {
    return this.questions[index];
  }

  addQuestion(data: QuestionData) {
    this.questions.push(data);
  }

  updateQuestion(index: number, updatedData: QuestionData) {
    if (this.questions[index]) {
      this.questions[index] = updatedData;
    }
  }

  removeQuestion(index: number) {
    if (this.questions[index]) {
      this.questions.splice(index, 1);
    }
  }
}
