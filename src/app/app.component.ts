import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YahtzeeComponent } from "./yahtzee/yahtzee.component";
import { YahtzeeRestCallComponent } from "./yahtzee-rest-call/yahtzee-rest-call.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YahtzeeComponent, YahtzeeRestCallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Yahtzee';
}
