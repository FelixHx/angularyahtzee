import { Injectable } from '@angular/core';
import { Row } from './kniffel/row';
import { NgFor, NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class KniffelApiService {
  fields : Row[] = [];

  init() {
    this.fields  = [
      {id: "1", title:"Aces", points: null, sum:false},
      {id: "2", title:"Twos", points: null, sum:false},
      {id: "3", title:"Threes", points: null, sum:false},
      {id: "4", title:"Fours", points: null, sum:false},
      {id: "5", title:"Fives", points: null, sum:false},
      {id: "6", title:"Sixes", points: null, sum:false},
      {id: "T", title:"Total", points: null, sum:true},
      {id: "B", title:"Bonus", points: null, sum:true},
      {id: "TU", title:"Total Upper", points: null, sum:true},
      {id: "3K", title:"Three of a Kind", points: null, sum:false},
      {id: "4K", title:"Four of a Kind", points: null, sum:false},
      {id: "FH", title:"Full House", points: null, sum:false},
      {id: "SS", title:"Small Straight", points: null, sum:false},
      {id: "LS", title:"Large Straight", points: null, sum:false},
      {id: "Y", title:"Yahtzee", points: null, sum:false},
      {id: "CH", title:"Chance", points: null, sum:false},
      {id: "TL", title:"Total Lower", points: null, sum:true},
      {id: "TU", title:"Total Upper", points: null, sum:true},
      {id: "GT", title:"Grand Total", points: null, sum:true}]
  }

  getAll()  : Row[] {
    var pointsT:number = 0;
    var pointsB:number = 0;
    var pointsTU:number = 0;
    var pointsTL:number = 0;
    var pointsGT:number = 0;

    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '1' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '2' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '3' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '4' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '5' )?.points || 0);
    pointsT = pointsT+ (this.fields.find( ({ id }) => id === '6' )?.points || 0);
    if (pointsT>=63) pointsB=35;
    pointsTU = pointsT+pointsB;
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === '3K' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === '4K' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === 'FH' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === 'SS' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === 'LS' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === 'Y' )?.points || 0);
    pointsTL = pointsTL+ (this.fields.find( ({ id }) => id === 'CH' )?.points || 0);
    pointsGT = pointsTU+pointsTL;

    //console.log(pointsTU);
    for (var val of this.fields) {
      if (val.id == "T" ) val.points=pointsT; 
      if (val.id == "B" ) val.points=pointsB; 
      if (val.id == "TU" ) val.points=pointsTU; 
      if (val.id == "TL" ) val.points=pointsTL; 
      if (val.id == "GT" ) val.points=pointsGT; 
    }
    return this.fields;
  }

  constructor() { }
}
