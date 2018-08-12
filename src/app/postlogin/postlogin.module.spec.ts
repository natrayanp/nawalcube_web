import { PostloginModule } from './postlogin.module';

describe('PostloginModule', () => {
  let postloginModule: PostloginModule;

  beforeEach(() => {
    postloginModule = new PostloginModule();
  });

  it('should create an instance', () => {
    expect(postloginModule).toBeTruthy();
  });
});
