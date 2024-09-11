import { NgModule } from '@angular/core';
import { CreateQuestionComponent } from './create-question.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CreateQuestionComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [CreateQuestionComponent]
})
export class CreateQuestionModule { }
