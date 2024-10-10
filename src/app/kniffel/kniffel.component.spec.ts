import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KniffelComponent } from './kniffel.component';

describe('KniffelComponent', () => {
  let component: KniffelComponent;
  let fixture: ComponentFixture<KniffelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KniffelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KniffelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
