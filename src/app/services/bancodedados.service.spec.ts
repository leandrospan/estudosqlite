import { TestBed } from '@angular/core/testing';

import { BancodedadosService } from './bancodedados.service';

describe('BancodedadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BancodedadosService = TestBed.get(BancodedadosService);
    expect(service).toBeTruthy();
  });
});
