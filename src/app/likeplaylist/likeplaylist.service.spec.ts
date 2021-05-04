import { TestBed } from '@angular/core/testing';

import { LikeplaylistService } from './likeplaylist.service';

describe('LikeplaylistService', () => {
  let service: LikeplaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeplaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
