import { Injectable } from '@angular/core';


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
  private questions: QuestionData[] = [
    {
      "question": "How are you?",
      "textPhrase": "adsds <span class=\"token\" contenteditable=\"false\" style=\"background-color: rgba(34, 34, 34, 0.12); width: 80px; height: 24px; border: none; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; margin-right: 8px; margin-left: 8px;\">Token</span>dsds",
      "responses": [
        {
          "response": "a"
        },
        {
          "response": "an"
        },
        {
          "response": ""
        }
      ]
    }
  ]
  constructor() { }

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
