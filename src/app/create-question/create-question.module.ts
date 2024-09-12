import { NgModule } from '@angular/core';
import { CreateQuestionComponent } from './create-question.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateQuestionRoutingModule } from './create-question-routing.module';
@NgModule({
  declarations: [
    CreateQuestionComponent
  ],
  imports: [
    CommonModule, FormsModule,CreateQuestionRoutingModule
  ],
  exports: [CreateQuestionComponent]
})
export class CreateQuestionModule { }
