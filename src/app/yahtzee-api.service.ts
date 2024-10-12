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
      { title: "Aces", points: null, optPoints: null, sum: false },
      { title: "Twos", points: null, optPoints: null, sum: false },
      { title: "Threes", points: null, optPoints: null, sum: false },
      { title: "Fours", points: null, optPoints: null, sum: false },
      { title: "Fives", points: null, optPoints: null, sum: false },
      { title: "Sixes", points: null, optPoints: null, sum: false },
      { title: "Total", points: null, optPoints: null, sum: true },
      { title: "Bonus", points: null, optPoints: null, sum: true },
      { title: "Total Upper", points: null, optPoints: null, sum: true },
      { title: "Three of a Kind", points: null, optPoints: null, sum: false },
      { title: "Four of a Kind", points: null, optPoints: null, sum: false },
      { title: "Full House", points: null, optPoints: null, sum: false },
      { title: "Small Straight", points: null, optPoints: null, sum: false },
      { title: "Large Straight", points: null, optPoints: null, sum: false },
      { title: "Yahtzee", points: null, optPoints: null, sum: false },
      { title: "Chance", points: null, optPoints: null, sum: false },
      { title: "Total Lower", points: null, optPoints: null, sum: true },
      { title: "Total Upper", points: null, optPoints: null, sum: true },
      { title: "Grand Total", points: null, optPoints: null, sum: true }]
  }

  getAll(): Row[] {
    this.fields[6].points = 0; // Total
    this.fields[7].points = 0; // Bonus
    this.fields[8].points = 0; // Total Upper
    this.fields[17].points = 0; // Total Upper
    this.fields[6].points += (this.fields[0]?.points || 0); // Aces
    this.fields[6].points += (this.fields[1]?.points || 0); // Twos
    this.fields[6].points += (this.fields[2]?.points || 0); // Threes
    this.fields[6].points += (this.fields[3]?.points || 0); // Fours
    this.fields[6].points += (this.fields[4]?.points || 0); // Fives
    this.fields[6].points += (this.fields[5]?.points || 0); // Sixes
    if (this.fields[6].points >= 63) this.fields[7].points = 35;
    this.fields[8].points = this.fields[6].points + this.fields[7].points;
    this.fields[17].points += (this.fields[9]?.points || 0); // Three of a Kind
    this.fields[17].points += (this.fields[10]?.points || 0); // Four of a Kind
    this.fields[17].points += (this.fields[11]?.points || 0); // Full House
    this.fields[17].points += (this.fields[12]?.points || 0); // Small Street
    this.fields[17].points += (this.fields[13]?.points || 0); // Large Street
    this.fields[17].points += (this.fields[14]?.points || 0); // Yahtzee
    this.fields[17].points += (this.fields[15]?.points || 0); // Chance
    this.fields[16].points = this.fields[8].points; 
    this.fields[18].points = this.fields[16].points + this.fields[17].points;

    return this.fields;
  }

  constructor() { }
}
