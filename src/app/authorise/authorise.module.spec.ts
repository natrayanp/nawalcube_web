import { AuthoriseModule } from './authorise.module';

describe('AuthoriseModule', () => {
  let authoriseModule: AuthoriseModule;

  beforeEach(() => {
    authoriseModule = new AuthoriseModule();
  });

  it('should create an instance', () => {
    expect(authoriseModule).toBeTruthy();
  });
});
