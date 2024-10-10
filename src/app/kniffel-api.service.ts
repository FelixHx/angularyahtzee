import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KniffelApiService {
  fields : {short: string,title: string,  points: number | null, sum: boolean}[] =[
    {short: "", title:"Twos", points:null, sum:false},
    {short: "", title:"Aces", points: 3, sum:false},
    {short: "", title:"Threes", points: null, sum:false},
    {short: "", title:"Fours", points: null, sum:false},
    {short: "", title:"Fives", points: 20, sum:false},
    {short: "", title:"Sixes", points: null, sum:false},
    {short: "", title:"Total", points: null, sum:true},
    {short: "", title:"Bonus", points: null, sum:true},
    {short: "", title:"Total Upper", points: null, sum:true},
    {short: "", title:"Three of a Kind", points: null, sum:false},
    {short: "", title:"Four of a Kind", points: null, sum:false},
    {short: "", title:"Full House", points: 25, sum:false},
    {short: "", title:"Small Straight", points: null, sum:false},
    {short: "", title:"Yahtzee", points: null, sum:false},
    {short: "", title:"Large Straight", points: 40, sum:false},
    {short: "", title:"Chance", points: null, sum:false},
    {short: "", title:"Total Lower", points: null, sum:true},
    {short: "", title:"Total Upper", points: null, sum:true},
    {short: "", title:"Grand Total", points: null, sum:true}  ]  ;

  getAll()  :  {title: string,  points: number | null}[] {
    return this.fields;
  }

  constructor() { }
}
