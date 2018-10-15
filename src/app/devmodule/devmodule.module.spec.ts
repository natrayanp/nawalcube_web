import { DevmoduleModule } from './devmodule.module';

describe('DevmoduleModule', () => {
  let devmoduleModule: DevmoduleModule;

  beforeEach(() => {
    devmoduleModule = new DevmoduleModule();
  });

  it('should create an instance', () => {
    expect(devmoduleModule).toBeTruthy();
  });
});
