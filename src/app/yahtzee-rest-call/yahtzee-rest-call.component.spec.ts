import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YahtzeeRestCallComponent } from './yahtzee-rest-call.component';

describe('YahtzeeRestCallComponent', () => {
  let component: YahtzeeRestCallComponent;
  let fixture: ComponentFixture<YahtzeeRestCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YahtzeeRestCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YahtzeeRestCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
