import { TestBed } from '@angular/core/testing';

import { SellerapiService } from './sellerapi.service';

describe('SellerapiService', () => {
  let service: SellerapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
