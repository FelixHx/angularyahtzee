import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KniffelApiService {
  fields : {title: string,  points: number | null}[] =[
    {title:"Aces", points: 3},
    {title:"Twos", points:null},
    {title:"Threes", points: null},
    {title:"Fours", points: null},
    {title:"Fives", points: 20},
    {title:"Sixes", points: null},
    {title:"Total", points: null},
    {title:"Bonus", points: null},
    {title:"Total Upper", points: null},
    {title:"Three of a Kind", points: null},
    {title:"Four of a Kind", points: null},
    {title:"Full House", points: 25},
    {title:"Small Straight", points: null},
    {title:"Large Straight", points: 40},
    {title:"Yahtzee", points: null},
    {title:"Chance", points: null},
    {title:"Total Lower", points: null},
    {title:"Total Upper", points: null},
    {title:"Grand Total", points: null}  ]  ;

  getAll()  :  {title: string,  points: number | null}[] {
    return this.fields;
  }

  constructor() { }
}
