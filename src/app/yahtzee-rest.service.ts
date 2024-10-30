import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeRestService {

  callRest(queryString: string): string {
    console.log('callRest');
    let url: string = 'https://dev.holderied.de/rest.php?' + queryString;
    ;

    let bestChoice: string = 'undefined';
    let maxProbability: number = -1;

    this.http.get<ApplicationConfig>(url).subscribe(probabilities => {
      //console.log(JSON.stringify({ probabilities }, null, 4));
      Object.entries(probabilities).forEach(([key, value]) => {
        //console.log(key + ' - ' + value) // key - value
        //console.log(value) // key - value
        //console.log(Number(value)) // key - value

        if ((key.match(/Field/) || key.match(/selection/)) && (Number(value) > maxProbability)) {
          console.log('Field Match') // key - value
          maxProbability = value;
          bestChoice = key;
          console.log('bestChoice in Loop ' + bestChoice) // key - value
        }
      })
    });
    console.log('bestChoice ' + bestChoice) // key - value
    return bestChoice+ 'xxx';
  }

  constructor(private http: HttpClient) {
  }

}