import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-preview-question-header",
    templateUrl: './preview-question-header.component.html',
    styleUrls: ['./preview-question-header.component.scss']
})

export class PreviewQuestionHeaderComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() {

    }
    exitpreview(){
        console.log("Exit");
        
        this.router.navigate(['/create-question']);
        localStorage.removeItem("previewQuestion");
    }
}