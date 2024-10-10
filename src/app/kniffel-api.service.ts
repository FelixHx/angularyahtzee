import { Injectable } from '@angular/core';
import { Row } from './kniffel/row';

@Injectable({
  providedIn: 'root'
})

export class KniffelApiService {
  fields : Row[] =[
    {short: "1", title:"Twos", points:null, sum:false},
    {short: "2", title:"Aces", points: 3, sum:false},
    {short: "3", title:"Threes", points: null, sum:false},
    {short: "4", title:"Fours", points: null, sum:false},
    {short: "5", title:"Fives", points: 20, sum:false},
    {short: "6", title:"Sixes", points: null, sum:false},
    {short: "T", title:"Total", points: null, sum:true},
    {short: "B", title:"Bonus", points: null, sum:true},
    {short: "ZU", title:"Total Upper", points: null, sum:true},
    {short: "3K", title:"Three of a Kind", points: null, sum:false},
    {short: "4K", title:"Four of a Kind", points: null, sum:false},
    {short: "FH", title:"Full House", points: 25, sum:false},
    {short: "SS", title:"Small Straight", points: null, sum:false},
    {short: "LS", title:"Large Straight", points: 40, sum:false},
    {short: "Y", title:"Yahtzee", points: null, sum:false},
    {short: "CH", title:"Chance", points: null, sum:false},
    {short: "TL", title:"Total Lower", points: null, sum:true},
    {short: "TU", title:"Total Upper", points: null, sum:true},
    {short: "GT", title:"Grand Total", points: null, sum:true}  ]  ;

  getAll()  : Row[] {
    return this.fields;
  }

  constructor() { }
}
