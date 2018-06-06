import { TestBed, inject } from '@angular/core/testing';

import { SortListService } from './sort-list.service';

describe('SortListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortListService]
    });
  });

  it('should be created', inject([SortListService], (service: SortListService) => {
    expect(service).toBeTruthy();
  }));
});
