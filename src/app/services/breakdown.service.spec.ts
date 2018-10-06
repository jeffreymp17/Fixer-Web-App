import { TestBed, inject } from '@angular/core/testing';

import { BreakdownService } from './breakdown.service';

describe('BreakdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakdownService]
    });
  });

  it('should be created', inject([BreakdownService], (service: BreakdownService) => {
    expect(service).toBeTruthy();
  }));
});
