import { TestBed } from '@angular/core/testing';

import { NytApiService } from './nyt-api.service';

describe('NytApiService', () => {
  let service: NytApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NytApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
