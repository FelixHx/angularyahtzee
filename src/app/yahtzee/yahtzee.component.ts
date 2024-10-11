import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Row } from '../yahtzee/row';
import { Dice } from '../yahtzee/dice';
import { YahtzeeApiService } from '../yahtzee-api.service';

@Component({
  selector: 'app-yahtzee',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './yahtzee.component.html',
  styleUrl: './yahtzee.component.scss'
})
export class YahtzeeComponent {

  fields: Row[] = [];

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
    console.log(sum);

    var maxHist = Math.max.apply(null, histogramm);
    console.log(maxHist);

    this.fields.forEach(function (field) {
      if (field.id == "1") field.optPoints = histogramm[0];
      if (field.id == "2") field.optPoints = histogramm[1] * 2;
      if (field.id == "3") field.optPoints = histogramm[2] * 3;
      if (field.id == "4") field.optPoints = histogramm[3] * 4;
      if (field.id == "5") field.optPoints = histogramm[4] * 5;
      if (field.id == "6") field.optPoints = histogramm[5] * 6;
      if (field.id == "3K") if (maxHist >= 3) field.optPoints = sum; else field.optPoints = 0;
      if (field.id == "4K") if (maxHist >= 4) field.optPoints = sum; else field.optPoints = 0;
      if (field.id == "FH") if (maxHist >= 3 && (histogramm.includes(3) && histogramm.includes(2) || maxHist == 5)) field.optPoints = 25; else field.optPoints = 0;
      if (field.id == "SS") if (
        (
          (histogramm[0] > 0 && histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0) ||
          (histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0) ||
          (histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0 && histogramm[5] > 0)
        )) field.optPoints = 30; else field.optPoints = 0;
      if (field.id == "LS") if (maxHist == 1 && histogramm[0] + histogramm[5] == 1) field.optPoints = 40; else field.optPoints = 0;
      if (field.id == "Y") if (maxHist == 5) field.optPoints = 50; else field.optPoints = 0;
      if (field.id == "CH") field.optPoints = sum;
    })
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

  score(field: Row) {
    field.points = field.optPoints;
    this.rollNumber = 0;
    this.rollDices();
  }

  rollDices(): void {
    if (this.rollNumber == 0) this.dices.forEach(function (value) { value.fixed = false; })
    this.dices.forEach(function (value) {
      if (!value.fixed) value.val = Math.floor((Math.random() * 6) + 1);
    })
    this.rollNumber++;
    this.points(this.dices);
  }
};

