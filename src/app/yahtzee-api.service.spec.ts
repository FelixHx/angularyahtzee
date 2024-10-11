import { TestBed } from '@angular/core/testing';

import { YahtzeeApiService } from './yahtzee-api.service';

describe('YahtzeeApiService', () => {
  let service: YahtzeeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YahtzeeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
