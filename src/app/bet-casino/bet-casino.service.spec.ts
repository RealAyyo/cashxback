import { Test, TestingModule } from '@nestjs/testing';
import { BetCasinoService } from './bet-casino.service';

describe('BetCasinoService', () => {
  let service: BetCasinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetCasinoService],
    }).compile();

    service = module.get<BetCasinoService>(BetCasinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
