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
      this.fields[0].optPoints[p] = histogramm[0];
      this.fields[1].optPoints[p] = histogramm[1] * 2;
      this.fields[2].optPoints[p] = histogramm[2] * 3;
      this.fields[3].optPoints[p] = histogramm[3] * 4;
      this.fields[4].optPoints[p] = histogramm[4] * 5;
      this.fields[5].optPoints[p] = histogramm[5] * 6;
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
    this.dices[i].fixed = !this.dices[i].fixed;
  }

  score(p: number, field: Row): void {
    field.points[p] = field.optPoints[p];
    this.rollNumber = 0;
    this.rollDices();
    this.fields = this.yahtzeeApiService.getAll();
    this.currentPlayer = 1 - this.currentPlayer;
    if (this.currentPlayer == 0) { this.round++ };
    console.log("currentPlayer" + this.currentPlayer);
    console.log("round" + this.round);
    this.gameOver = (this.round >= 13);
  }

  randomDice(): number { return Math.floor((Math.random() * 6) + 1) };
  //randomDice(): number { return 4};


  rollDices(): void {
    if (this.rollNumber == 0) this.dices.forEach(function (value) { value.fixed = false; })

    this.dices.forEach(dice => {
      if (!dice.fixed) dice.val = this.randomDice();
    });

    this.rollNumber++;
    this.points(this.dices);

    let queryString: string;
    queryString = 'player=' + (this.currentPlayer + 1);
    queryString += '&rollNumber=' + this.rollNumber;
    queryString += '&lastRoll=';
    this.dices.forEach(dice => {
      queryString += dice.val;
    });
    queryString += '&f-1-0=4&f-2-2=6';
    this.yahtzeeRestService.callRest(queryString);
  }
};

