import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewQuestionRoutingModule } from './preview-question-routing.module';
import { PreviewQuestionComponent } from './preview-question.component';
import { PreviewQuestionHeaderComponent } from './preview-question-header/preview-question-header.component';

@NgModule({
  declarations: [PreviewQuestionComponent, PreviewQuestionHeaderComponent],
  imports: [
    CommonModule,
    PreviewQuestionRoutingModule
  ]
})
export class PreviewQuestionModule { }
