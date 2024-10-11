import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YahtzeeComponent } from './yahtzee.component';

describe('YahtzeelComponent', () => {
  let component: YahtzeeComponent;
  let fixture: ComponentFixture<YahtzeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YahtzeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YahtzeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
