import { Injectable } from '@angular/core';
import { Row } from './yahtzee/row';
import { HttpClient, withFetch, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationConfig } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeRestService {

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