import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-new-question-header',
  templateUrl: './create-new-question-header.component.html',
  styleUrls: ['./create-new-question-header.component.scss']
})
export class CreateNewQuestionHeaderComponent implements OnInit {
  constructor(private router: Router) { };
  ngOnInit() {

  }

  preview(){
    this.router.navigate(['/preview-question']);
  }
}
