import { Injectable } from '@angular/core';
import { Row } from './yahtzee/row';
import { NgFor, NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeApiService {
  fields: Row[] = [];

  init() {
    this.fields = [
      { title: "Aces", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Twos", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Threes", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Fours", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Fives", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Sixes", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Total", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true },
      { title: "Bonus", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true },
      { title: "Total Upper", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true },
      { title: "Three of a Kind", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Four of a Kind", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Full House", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Small Straight", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Large Straight", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Yahtzee", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Chance", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: false },
      { title: "Total Lower", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true },
      { title: "Total Upper", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true },
      { title: "Grand Total", points0: null, optPoints0: null, points1: null, optPoints1: null, sum: true }]
  }

  getAll(): Row[] {
    this.fields[6].points0 = 0; // Total
    this.fields[7].points0 = 0; // Bonus
    this.fields[8].points0 = 0; // Total Upper
    this.fields[17].points0 = 0; // Total Upper
    this.fields[6].points0 += (this.fields[0]?.points0 || 0); // Aces
    this.fields[6].points0 += (this.fields[1]?.points0 || 0); // Twos
    this.fields[6].points0 += (this.fields[2]?.points0 || 0); // Threes
    this.fields[6].points0 += (this.fields[3]?.points0 || 0); // Fours
    this.fields[6].points0 += (this.fields[4]?.points0 || 0); // Fives
    this.fields[6].points0 += (this.fields[5]?.points0 || 0); // Sixes
    if (this.fields[6].points0 >= 63) this.fields[7].points0 = 35;
    this.fields[8].points0 = this.fields[6].points0 + this.fields[7].points0;
    this.fields[17].points0 += (this.fields[9]?.points0 || 0); // Three of a Kind
    this.fields[17].points0 += (this.fields[10]?.points0 || 0); // Four of a Kind
    this.fields[17].points0 += (this.fields[11]?.points0 || 0); // Full House
    this.fields[17].points0 += (this.fields[12]?.points0 || 0); // Small Street
    this.fields[17].points0 += (this.fields[13]?.points0 || 0); // Large Street
    this.fields[17].points0 += (this.fields[14]?.points0 || 0); // Yahtzee
    this.fields[17].points0 += (this.fields[15]?.points0 || 0); // Chance
    this.fields[16].points0 = this.fields[8].points0;
    this.fields[18].points0 = this.fields[16].points0 + this.fields[17].points0;

    return this.fields;
  }

  constructor() { }
}
