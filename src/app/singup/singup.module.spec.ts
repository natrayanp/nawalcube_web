import { SingupModule } from './singup.module';

describe('SingupModule', () => {
  let singupModule: SingupModule;

  beforeEach(() => {
    singupModule = new SingupModule();
  });

  it('should create an instance', () => {
    expect(singupModule).toBeTruthy();
  });
});
