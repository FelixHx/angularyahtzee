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
    this.kniffelApiService.init();
    this.fields = this.kniffelApiService.getAll();
  };


  points(fieldId:string, dices:number[]) : number{
    var sum = 0;
    var histogramm = [0,0,0,0,0,0];
       
    dices.forEach(function (value){
      histogramm[value-1] ++;
    })

    var maxHist=Math.max.apply(null, histogramm);
    var minHist=Math.min.apply(null, histogramm);

    //histogramm.forEach( function (value){
    //  console.log(value);
    //})

    dices.forEach(function (value){
      if (fieldId=="1" && value==1) sum += value;
      if (fieldId=="2" && value==2) sum += value;
      if (fieldId=="3" && value==3) sum += value;
      if (fieldId=="4" && value==4) sum += value;
      if (fieldId=="5" && value==5) sum += value;
      if (fieldId=="6" && value==6) sum += value;
      if (fieldId=="3K" && maxHist>=3) sum += value;
      if (fieldId=="4K" && maxHist>=4) sum += value;
      if (fieldId=="FH" && maxHist>=3 && (histogramm.includes(3)&& histogramm.includes(2)||maxHist==5)) sum += value;
      if (fieldId=="SS" && 
        (
          (histogramm[0]>0 && histogramm[1]>0 && histogramm[2]>0 && histogramm[3]>0) ||
          (histogramm[1]>0 && histogramm[2]>0 && histogramm[3]>0 && histogramm[4]>0) ||
          (histogramm[2]>0 && histogramm[3]>0 && histogramm[4]>0 && histogramm[5]>0)
        )) sum = 30;
        if (fieldId=="LS" && maxHist==1 && histogramm[0]+histogramm[5]==1) sum = 40;
        if (fieldId=="Y" && maxHist==5) sum = 50;
      if (fieldId=="CH") sum += value;      
    })
    return sum;
  }

  dices : number[] = [5,2,6,3,4];

  rollDice():void {
    this.kniffelApiService.getAll();
    //console.log("Roll Dice Fallera");
    //console.log(Math.floor((Math.random() * 6) + 1));
    this.dices = [
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
      Math.floor((Math.random() * 6) + 1),
    ];
    //console.log(this.points("6", this.dices));
  };
};

