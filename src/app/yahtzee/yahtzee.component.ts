import { Component } from '@angular/core';
import { NgFor, NgIf, NgForOf } from '@angular/common';
import { Row } from '../yahtzee/row';
import { Dice } from '../yahtzee/dice';
import { YahtzeeApiService } from '../yahtzee-api.service';

@Component({
  selector: 'app-yahtzee',
  standalone: true,
  imports: [NgFor, NgIf, NgForOf],
  templateUrl: './yahtzee.component.html',
  styleUrl: './yahtzee.component.scss'
})
export class YahtzeeComponent {

  fields: Row[] = [];
  round: number = 0;
  gameOver: boolean = false;

  constructor(private yahtzeeApiService: YahtzeeApiService) {
    this.yahtzeeApiService.init();
    this.fields = this.yahtzeeApiService.getAll();
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

    this.fields[0].optPoints = histogramm[0];
    this.fields[1].optPoints = histogramm[1] * 2;
    this.fields[2].optPoints = histogramm[2] * 3;
    this.fields[3].optPoints = histogramm[3] * 4;
    this.fields[4].optPoints = histogramm[4] * 5;
    this.fields[5].optPoints = histogramm[5] * 6;
    if (maxHist >= 3) this.fields[9].optPoints = sum; else this.fields[9].optPoints = 0;
    if (maxHist >= 4) this.fields[10].optPoints = sum; else this.fields[10].optPoints = 0;
    if (maxHist >= 3 && (histogramm.includes(3) && histogramm.includes(2) || maxHist == 5)) this.fields[11].optPoints = 25; else this.fields[11].optPoints = 0;
    if (
      (
        (histogramm[0] > 0 && histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0) ||
        (histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0) ||
        (histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0 && histogramm[5] > 0)
      )) this.fields[12].optPoints = 30; else this.fields[12].optPoints = 0;
    if (maxHist == 1 && histogramm[0] + histogramm[5] == 1) this.fields[13].optPoints = 40; else this.fields[13].optPoints = 0;
    if (maxHist == 5) this.fields[14].optPoints = 50; else this.fields[14].optPoints = 0;
    this.fields[15].optPoints = sum;
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

  score(field: Row): void {
    field.points = field.optPoints;
    this.rollNumber = 0;
    this.rollDices();
    this.fields = this.yahtzeeApiService.getAll();
    this.round++;
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
  }
};

