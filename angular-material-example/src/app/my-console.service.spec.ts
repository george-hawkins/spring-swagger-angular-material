import { TestBed, inject } from '@angular/core/testing';

import { MyConsoleService } from './my-console.service';

describe('MyConsoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyConsoleService]
    });
  });

  it('should be created', inject([MyConsoleService], (service: MyConsoleService) => {
    expect(service).toBeTruthy();
  }));
});
