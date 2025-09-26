import { TestBed } from '@angular/core/testing';

import { NAPOD } from './napod';

describe('NAPOD', () => {
  let service: NAPOD;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NAPOD);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
