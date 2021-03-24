/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CharitySearchService } from './charity-search.service';

describe('Service: CharitySearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharitySearchService]
    });
  });

  it('should ...', inject([CharitySearchService], (service: CharitySearchService) => {
    expect(service).toBeTruthy();
  }));
});
