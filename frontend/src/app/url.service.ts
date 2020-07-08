import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
//import {Router} from '@angular/rout
'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class UrlService {

    private textStore = [];

    private textSubject = new Subject();

    text = this.textSubject.asObservable();

constructor(private http: Http) {}

    BASE_URL = 'https://webscraper-282221.wm.r.appspot.com/api';

    urlInput(urlData) {
        console.log(urlData.url);
	this.http.post(this.BASE_URL+'/search', urlData).subscribe(response => {
	       console.log(response);
               this.textStore = [response.json()];
               this.textSubject.next(this.textStore);
           }, error => {
              console.log(`unable to get text with error: ${error}`);
           });

    }

    highlightWord(wordData) {
        console.log(wordData.word);
        this.http.post(this.BASE_URL+'/highlight/'+wordData.word, wordData).subscribe(response => {
	       console.log(response.json());
               this.textStore = [response.json()];
               this.textSubject.next(this.textStore);
           }, error => {
              console.log(`unable to get highlighted text with error: ${error}`);
           });

    }

}