import { DevloginmoduleModule } from './devlogin.module';

describe('DevloginmoduleModule', () => {
  let devloginmoduleModule: DevloginmoduleModule;

  beforeEach(() => {
    devloginmoduleModule = new DevloginmoduleModule();
  });

  it('should create an instance', () => {
    expect(devloginmoduleModule).toBeTruthy();
  });
});
