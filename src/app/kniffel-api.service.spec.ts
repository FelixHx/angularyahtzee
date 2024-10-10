import { TestBed } from '@angular/core/testing';

import { KniffelApiService } from './kniffel-api.service';

describe('KniffelApiService', () => {
  let service: KniffelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KniffelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
