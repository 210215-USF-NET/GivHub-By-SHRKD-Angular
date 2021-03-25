import { TestBed } from '@angular/core/testing';

import { CharityAPIService } from './charity-api.service';

describe('CharityAPIService', () => {
  let service: CharityAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharityAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
