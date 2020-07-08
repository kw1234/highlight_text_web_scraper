
import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {UrlService} from './url.service';

@Component({
        selector: 'urlcomp',
        template:`
        <mat-card>
            <mat-form-field>
                <input matInput [(ngModel)]="urlData.url" placeholder="Url">
            </mat-form-field>
	    <button mat-raised-button color="primary" (click)="urlInput()">Search</button>
        </mat-card>
	<div *ngFor="let text of urlServ.text | async">
            <mat-card class="card">
                <mat-card-content>
                    <div *ngFor="let word of text.topWords">
			<button mat-raised-button color="primary" (click)="highlightWord(word[0])">{{word[0]}}</button>
		    </div>
		</mat-card-content>
             </mat-card>
             <mat-card class="card">
	        <div [innerHTML]="text.text"></div>
	        <!-- <p>{{text.text}}</p> -->
                <!-- <mat-card-content> {{text.text}} </mat-card-content> -->
             </mat-card>
        </div>
        `
})

export class UrlComponent {
       constructor(public urlServ: UrlService) {}

       urlData = {
           url: ''
       }

       wordData = {
           word: ''
       }      

       urlInput() {
          this.urlServ.urlInput(this.urlData);
       }

       highlightWord(word) {
          this.urlServ.highlightWord({word: word});
       }
}