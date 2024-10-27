import { HttpClient, withFetch, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationConfig } from '@angular/core';

@Component({
  selector: 'app-yahtzee-rest-call',
  standalone: true,
  imports: [],
  templateUrl: './yahtzee-rest-call.component.html',
  styleUrl: './yahtzee-rest-call.component.scss'
})
export class YahtzeeRestCallComponent {
  ngOnInit(): void {
    console.log('ngOnInit');
    this.callRest();
  };

  callRest(): void {
    console.log('callRest');
    let url: string = 'https://dev.holderied.de/rest.php?player=1&rollNumber=2&f-1-0=4&f-2-2=6&lastRoll=66666';

    this.http.get<ApplicationConfig>(url).subscribe(config => {

      console.log('hallo Welt' + ' ' + config + ' ');

      for (const item of Object.keys(config)) {
        console.log('Attribute: ' + item);
      }
      for (const item of Object.values(config)) {
        console.log('Attribute: ' + item);
      }
    });


  }

  constructor(private http: HttpClient) {
  }

}