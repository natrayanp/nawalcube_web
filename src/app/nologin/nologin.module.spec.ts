import { NologinModule } from './nologin.module';

describe('NologinModule', () => {
  let nologinModule: NologinModule;

  beforeEach(() => {
    nologinModule = new NologinModule();
  });

  it('should create an instance', () => {
    expect(nologinModule).toBeTruthy();
  });
});
