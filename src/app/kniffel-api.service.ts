import { Injectable } from '@angular/core';
import { Row } from './kniffel/row';
import { NgFor, NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class KniffelApiService {
  fields : Row[] =[
    {short: "1", title:"Aces", points: 3, sum:false},
    {short: "2", title:"Twos", points:null, sum:false},
    {short: "3", title:"Threes", points: null, sum:false},
    {short: "4", title:"Fours", points: 16, sum:false},
    {short: "5", title:"Fives", points: 20, sum:false},
    {short: "6", title:"Sixes", points: 24, sum:false},
    {short: "T", title:"Total", points: null, sum:true},
    {short: "B", title:"Bonus", points: null, sum:true},
    {short: "TU", title:"Total Upper", points: null, sum:true},
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
    var pointsT:number = 0;
    var pointsB:number = 0;
    var pointsTU:number = 0;
    var pointsTL:number = 0;
    var pointsGT:number = 0;

    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '1' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '2' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '3' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '4' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '5' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ short }) => short === '6' )?.points || 0);
    if (pointsT>=63) pointsB=35;
    pointsTU = pointsT+pointsB;
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === '3K' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === '4K' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === 'FH' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === 'SS' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === 'LS' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === 'Y' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ short }) => short === 'CH' )?.points || 0);
    pointsGT = pointsTU+pointsTL;

    //console.log(pointsTU);
    for (var val of this.fields) {
      if (val.short == "T" ) val.points=pointsT; 
      if (val.short == "B" ) val.points=pointsB; 
      if (val.short == "TU" ) val.points=pointsTU; 
      if (val.short == "TL" ) val.points=pointsTL; 
      if (val.short == "GT" ) val.points=pointsGT; 
    }
    return this.fields;
  }

  constructor() { }
}
