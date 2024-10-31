import { Component } from '@angular/core';
import { NgFor, NgIf, NgForOf } from '@angular/common';
import { Row } from '../yahtzee/row';
import { Dice } from '../yahtzee/dice';
import { YahtzeeApiService } from '../yahtzee-api.service';
import { YahtzeeRestService } from '../yahtzee-rest.service';

@Component({
  selector: 'app-yahtzee',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './yahtzee.component.html',
  styleUrl: './yahtzee.component.scss'
})
export class YahtzeeComponent {
  currentPlayer: number = 0;
  fields: Row[] = [];
  round: number = 0;
  gameOver: boolean = false;
  comment: string = '';
  winningProbability: string[] = ['',''];

  constructor(private yahtzeeApiService: YahtzeeApiService, private yahtzeeRestService: YahtzeeRestService) {
    this.yahtzeeApiService.init();
    this.fields = this.yahtzeeApiService.getAll();
    this.rollDices();
  };

  points(dices: Dice[]) {
    var sum = 0;
    var histogramm = [0, 0, 0, 0, 0, 0];

    dices.forEach(function (dice) {
      histogramm[dice.val - 1]++;
      sum += dice.val;
    })
    //console.log(sum);

    var maxHist = Math.max.apply(null, histogramm);
    //console.log(maxHist);
    for (let p of [0, 1]) {
      for (let i = 0; i < 6; i++) {
        this.fields[i].optPoints[p] = histogramm[i] * (i + 1);
      };
      if (maxHist >= 3) this.fields[9].optPoints[p] = sum; else this.fields[9].optPoints[p] = 0;
      if (maxHist >= 4) this.fields[10].optPoints[p] = sum; else this.fields[10].optPoints[p] = 0;
      if (maxHist >= 3 && (histogramm.includes(3) && histogramm.includes(2) || maxHist == 5)) this.fields[11].optPoints[p] = 25; else this.fields[11].optPoints[p] = 0;
      if (
        (
          (histogramm[0] > 0 && histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0) ||
          (histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0) ||
          (histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0 && histogramm[5] > 0)
        )) this.fields[12].optPoints[p] = 30; else this.fields[12].optPoints[p] = 0;
      if (maxHist == 1 && histogramm[0] + histogramm[5] == 1) this.fields[13].optPoints[p] = 40; else this.fields[13].optPoints[p] = 0;
      if (maxHist == 5) this.fields[14].optPoints[p] = 50; else this.fields[14].optPoints[p] = 0;
      this.fields[15].optPoints[p] = sum;
    }
  }

  rollNumber: number = 0;

  dices: Dice[] = [
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false }
  ];

  toggleFixed(i: number): void {
    //console.log('toggleFixed ' + i);
    this.dices[i].fixed = !this.dices[i].fixed;
  }

  score(p: number, field: Row): void {
    //console.log('score');
    // Schreibe Punkte
    field.points[p] = field.optPoints[p];
    // Wechsle Spieler
    this.currentPlayer = 1 - this.currentPlayer;
    // Zähle Runde hoch
    if (this.currentPlayer == 0) { this.round++ };
    // Setze Wurf auf 0 
    this.rollNumber = 0;
    this.rollDices();
    this.fields = this.yahtzeeApiService.getAll();
    this.gameOver = (this.round >= 13);
  }

  randomDice(): number { return Math.floor((Math.random() * 6) + 1) };
  //randomDice(): number { return 4};

  rollDices(): void {
    //console.log('rollDices');
    this.winningProbability = ['',''];
    this.comment = 'thinking ...'
    if (this.rollNumber == 0) this.dices.forEach(function (value) { value.fixed = false; })

    this.dices.forEach(dice => {
      if (!dice.fixed) dice.val = this.randomDice();
    });

    this.rollNumber++;
    this.points(this.dices);

    let queryString: string;
    queryString = 'player=' + this.currentPlayer;
    queryString += '&rollNumber=' + this.rollNumber;
    queryString += '&lastRoll=';
    this.dices.forEach(dice => {
      queryString += dice.val;
    });
    for (let i = 0; i < 6; i++) {
      if (this.fields[i].points[0] !== null) { queryString += '&f-0-' + i + '=' + this.fields[i].points[0]; };
      if (this.fields[i].points[1] !== null) { queryString += '&f-1-' + i + '=' + this.fields[i].points[1]; };
    }
    for (let i = 9; i < 16; i++) {
      if (this.fields[i].points[0] !== null) { queryString += '&f-0-' + (i - 3) + '=' + this.fields[i].points[0]; };
      if (this.fields[i].points[1] !== null) { queryString += '&f-1-' + (i - 3) + '=' + this.fields[i].points[1]; };
    }
    //console.log('queryString: ' + queryString);

    this.yahtzeeRestService.callRest(queryString).subscribe(probabilities => {
      let bestChoice: string = 'undefined';
      let maxProbability: number = -1;
      let bestField: number = -1;
      Object.entries(probabilities).forEach(([key, value]) => {
        if ((key.match(/Field/) || key.match(/selection/)) && (Number(value) > maxProbability)) {
          maxProbability = Number(value);
          bestChoice = key;
        }
      })
      this.winningProbability[this.currentPlayer] =  (Math.round((1+maxProbability) * 500) / 10).toFixed(1) + '%';
      this.winningProbability[1-this.currentPlayer] =  (Math.round((1-maxProbability) * 500) / 10).toFixed(1) + '%';

      //this.fields[19].points[] = Math.round((0.5 + maxProbability) * 1000) /10;
      //this.fields[19].points[1 - this.currentPlayer] = 0;
      if (bestChoice.match(/Field/)) {
        bestField = Number(bestChoice.substring(5));
        if (bestField >= 6) { bestField += 3 };
        this.comment = 'Write ' + this.fields[bestField].title;
      }
      if (bestChoice.match(/selection/)) {
        this.comment = 'Keep ' + Number(bestChoice.substring(9));
      }
    });
  }
};

