import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Row } from '../kniffel/row';
import { KniffelApiService } from '../kniffel-api.service';

@Component({
  selector: 'app-kniffel',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './kniffel.component.html',
  styleUrl: './kniffel.component.scss'
})
export class KniffelComponent {

  fields : Row[] =[];
  
  constructor(private kniffelApiService : KniffelApiService) {
    this.fields = this.kniffelApiService.getAll();
  };

  points(fieldId:string, dices:number[]) : number{
    var sum = 0;
    dices.forEach(function (value){
      if (fieldId=="1" && value==1) sum += value;
      if (fieldId=="2" && value==2) sum += value;
      if (fieldId=="3" && value==3) sum += value;
      if (fieldId=="4" && value==4) sum += value;
      if (fieldId=="5" && value==5) sum += value;
      if (fieldId=="6" && value==6) sum += value;
    })
    return sum;
  }

  dices : number[] = [5,5,6,2,1];

  rollDice():void {
    //console.log("Roll Dice Fallera");
    //console.log(Math.floor((Math.random() * 6) + 1));
    this.dices = [
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
    ];
    console.log(this.points("6", this.dices));
  };


};

