import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { CreateNewQuestionHeaderModule } from './create-new-question-header/create-new-question-header.module';
import { CreateQuestionModule } from './create-question/create-question.module';
import { PreviewQuestionModule } from './preview-question/preview-question.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    CreateNewQuestionHeaderModule,
    CreateQuestionModule,
    PreviewQuestionModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
