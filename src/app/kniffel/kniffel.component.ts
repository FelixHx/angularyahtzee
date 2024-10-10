import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { KniffelApiService } from '../kniffel-api.service';

@Component({
  selector: 'app-kniffel',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './kniffel.component.html',
  styleUrl: './kniffel.component.scss'
})
export class KniffelComponent {

  fields : {title: string,  points: number | null}[] =[];
  
  constructor(private kniffelApiService : KniffelApiService) {
    this.fields = this.kniffelApiService.getAll();
  };

};
