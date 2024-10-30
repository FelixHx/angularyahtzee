import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeRestService {

  callRest(queryString: string): Observable<any> {
    console.log('callRest');
    let url: string = 'https://dev.holderied.de/rest.php?' + queryString;
    ;
    return this.http.get(url);
  }
  
  constructor(private http: HttpClient) {
  }

}