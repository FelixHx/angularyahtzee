import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Row } from './row';
import { Dice } from './dice';
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

  points(field: Row, dices: Dice[]): number {
    var sum = 0;
    var histogramm = [0, 0, 0, 0, 0, 0];

    dices.forEach(function (value) {
      histogramm[value.val - 1]++;
    })

    var maxHist = Math.max.apply(null, histogramm);

    dices.forEach(function (value) {
      if (field.id == "1" && value.val == 1) sum += value.val;
      if (field.id == "2" && value.val == 2) sum += value.val;
      if (field.id == "3" && value.val == 3) sum += value.val;
      if (field.id == "4" && value.val == 4) sum += value.val;
      if (field.id == "5" && value.val == 5) sum += value.val;
      if (field.id == "6" && value.val == 6) sum += value.val;
      if (field.id == "3K" && maxHist >= 3) sum += value.val;
      if (field.id == "4K" && maxHist >= 4) sum += value.val;
      if (field.id == "FH" && maxHist >= 3 && (histogramm.includes(3) && histogramm.includes(2) || maxHist == 5)) sum = 25;
      if (field.id == "SS" &&
        (
          (histogramm[0] > 0 && histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0) ||
          (histogramm[1] > 0 && histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0) ||
          (histogramm[2] > 0 && histogramm[3] > 0 && histogramm[4] > 0 && histogramm[5] > 0)
        )) sum = 30;
      if (field.id == "LS" && maxHist == 1 && histogramm[0] + histogramm[5] == 1) sum = 40;
      if (field.id == "Y" && maxHist == 5) sum = 50;
      if (field.id == "CH") sum += value.val;
    })
    return sum;
  }

  rollNumber: number = 0;

  dices: Dice[] = [
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false },
    { val: 0, fixed: false }
  ];

  switchFixed(i: number): void {
    this.dices[i].fixed = !this.dices[i].fixed;
    //console.log(i);
  }

  score(field: Row) {
    field.points = this.points(field, this.dices);
    this.rollNumber = 0;
    this.rollDices();
  }

  rollDices(): void {
    this.yahtzeeApiService.getAll();
    if (this.rollNumber == 0) this.dices.forEach(function (value) { value.fixed = false; })
    this.dices.forEach(function (value) {
      if (!value.fixed) value.val = Math.floor((Math.random() * 6) + 1);
    })
    this.rollNumber++;
  }
};

