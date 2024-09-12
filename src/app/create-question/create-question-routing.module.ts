import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuestionComponent } from './create-question.component';

const routes: Routes = [
    { path: 'create-question', component: CreateQuestionComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class CreateQuestionRoutingModule {

}