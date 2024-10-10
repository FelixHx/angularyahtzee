import { Component } from '@angular/core';
//import { Book } from './book';
import { NgFor } from '@angular/common';
import { BooksApiService } from '../books-api.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})

export class BookListComponent {

  books: { title: string, description: string }[] = [];

  constructor(private booksApiService: BooksApiService) {
    this.books = this.booksApiService.getAll();
  };

}