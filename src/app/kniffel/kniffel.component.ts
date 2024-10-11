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

  rollDice():void {
    console.log("Roll Dice Fallera");
    this.kniffelApiService.setPoints("FH");
  };
};

