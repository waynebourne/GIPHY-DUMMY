import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  url : string;
  apiKey : string;

  constructor(private http: HttpClient) { 
    this.url = 'http://api.giphy.com/v1/gifs/';
    this.apiKey = 'AOUFYpyHf7X5EHuvcS1hin7Zs1aq6HBT';
  }

  getSearchResults(queryString : string, offset : number): Observable<any> {
    return this.http.get<any>(`${this.url}search?q=${queryString}&api_key=${this.apiKey}&offset=${offset}`);
    // .catch((error) => {
    //  simple logging, but you can do a lot more, see below
    //   this.handleError(error);
    // });
  } 

  getTrending(offset : number): Observable<any>{
    return this.http.get<any>(`${this.url}trending?api_key=${this.apiKey}&offset=${offset}`);
  }

  getRandomGif(): Observable<any>{
    return this.http.get<any>(`${this.url}random?api_key=${this.apiKey}`);
  }

  private handleError(err){
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }
}
