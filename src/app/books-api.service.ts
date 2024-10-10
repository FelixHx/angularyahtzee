import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {


  books : {title: string, description: string}[] =[
    {title:"Artur", 
      description:"Roloff"},    {    
    title: "Falleri",
    description: "Fallera"
  },
  {    
    title: "Falleri2",
    description: "Fallera2"
  }];

  getAll() : {title: string, description: string}[]{
    return this.books;
  }
  constructor() { }
}
