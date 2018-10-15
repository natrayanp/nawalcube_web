import { DevsecmoduleModule } from './devsec.module';

describe('DevsecmoduleModule', () => {
  let devsecmoduleModule: DevsecmoduleModule;

  beforeEach(() => {
    devsecmoduleModule = new DevsecmoduleModule();
  });

  it('should create an instance', () => {
    expect(devsecmoduleModule).toBeTruthy();
  });
});
