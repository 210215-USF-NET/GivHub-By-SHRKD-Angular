/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClearbitApiService } from './clearbit-api.service';

describe('Service: ClearbitApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearbitApiService]
    });
  });

  it('should ...', inject([ClearbitApiService], (service: ClearbitApiService) => {
    expect(service).toBeTruthy();
  }));
});
