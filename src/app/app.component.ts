import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoBoxComponent } from "./info-box/info-box.component";
import { BookListComponent } from "./book-list/book-list.component";
import { KniffelComponent } from "./kniffel/kniffel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoBoxComponent, BookListComponent, KniffelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kniffel';
}
