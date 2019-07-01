import { ForgetpwdModule } from './forgetpwd.module';

describe('ForgetpwdModule', () => {
  let forgetpwdModule: ForgetpwdModule;

  beforeEach(() => {
    forgetpwdModule = new ForgetpwdModule();
  });

  it('should create an instance', () => {
    expect(forgetpwdModule).toBeTruthy();
  });
});
