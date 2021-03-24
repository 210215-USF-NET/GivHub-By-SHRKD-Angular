import { TestBed } from '@angular/core/testing';

import { CharityRESTService } from './charity-rest.service';

describe('CharityRESTService', () => {
  let service: CharityRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharityRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
