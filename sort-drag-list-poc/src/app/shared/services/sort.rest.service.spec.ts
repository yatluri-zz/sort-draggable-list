import { TestBed, inject } from '@angular/core/testing';

import { Sort.RestService } from './sort.rest.service';

describe('Sort.RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sort.RestService]
    });
  });

  it('should be created', inject([Sort.RestService], (service: Sort.RestService) => {
    expect(service).toBeTruthy();
  }));
});
