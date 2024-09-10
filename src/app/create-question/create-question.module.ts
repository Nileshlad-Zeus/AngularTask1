import { NgModule } from '@angular/core';
import { CreateQuestionComponent } from './create-question.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    CreateQuestionComponent
  ],
  imports: [
    CommonModule, FormsModule, DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag
  ],
  exports: [CreateQuestionComponent]
})
export class CreateQuestionModule { }
