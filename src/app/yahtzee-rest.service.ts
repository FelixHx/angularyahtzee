import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeRestService {

  callRest(queryString: string): void {
    console.log('callRest');
    let url: string = 'https://dev.holderied.de/rest.php?' + queryString;
    ;

    this.http.get<ApplicationConfig>(url).subscribe(probabilities => {
      console.log(JSON.stringify({ probabilities}, null, 4));
    });
  }

  constructor(private http: HttpClient) {
  }

}