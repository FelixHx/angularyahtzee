import { Injectable } from '@angular/core';
import { Row } from './yahtzee/row';

@Injectable({
  providedIn: 'root'
})

export class YahtzeeApiService {
  fields: Row[] = [];

  init() {
    this.fields = [
      { title: "Aces", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Twos", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Threes", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Fours", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Fives", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Sixes", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Total", points: [null, null], optPoints: [null, null], sum: true },
      { title: "Bonus", points: [null, null], optPoints: [null, null], sum: true },
      { title: "Total Upper", points: [null, null], optPoints: [null, null], sum: true },
      { title: "Three of a Kind", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Four of a Kind", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Full House", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Small Straight", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Large Straight", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Yahtzee", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Chance", points: [null, null], optPoints: [null, null], sum: false },
      { title: "Total Lower", points: [null, null], optPoints: [null, null], sum: true },
      { title: "Total Upper", points: [null, null], optPoints: [null, null], sum: true },
      { title: "Grand Total", points: [null, null], optPoints: [null, null], sum: true }
    ]
  }

  getAll(): Row[] {
    for (let p of [0, 1]) {
      this.fields[6].points[p] = 0; // Total
      this.fields[7].points[p] = 0; // Bonus
      this.fields[8].points[p] = 0; // Total Upper
      this.fields[17].points[p] = 0; // Total Upper
      this.fields[6].points[p] = (this.fields[0]?.points[p] || 0) // Aces
        + (this.fields[1]?.points[p] || 0) // Twos
        + (this.fields[2]?.points[p] || 0) // Threes
        + (this.fields[3]?.points[p] || 0) // Fours
        + (this.fields[4]?.points[p] || 0) // Fives
        + (this.fields[5]?.points[p] || 0); // Sixes
      if ((this.fields[6]?.points[p] || 0) >= 63) this.fields[7].points[p] = 35;
      this.fields[8].points[p] = (this.fields[6]?.points[p] || 0) + (this.fields[7]?.points[p] || 0);
      this.fields[17].points[p] = (this.fields[9]?.points[p] || 0) // Three of a Kind
        + (this.fields[10]?.points[p] || 0) // Four of a Kind
        + (this.fields[11]?.points[p] || 0) // Full House
        + (this.fields[12]?.points[p] || 0) // Small Street
        + (this.fields[13]?.points[p] || 0) // Large Street
        + (this.fields[14]?.points[p] || 0) // Yahtzee
        + (this.fields[15]?.points[p] || 0); // Chance
      this.fields[16].points[p] = this.fields[8].points[p];
      this.fields[18].points[p] = (this.fields[16]?.points[p] || 0) + (this.fields[17]?.points[p] || 0);
    }
    return this.fields;
  }

  constructor() { }
}
