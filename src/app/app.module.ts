import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { CreateNewQuestionHeaderModule } from './create-new-question-header/create-new-question-header.module';
import { CreateQuestionComponent } from './create-question/create-question.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    CreateNewQuestionHeaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
