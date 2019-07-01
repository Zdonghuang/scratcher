import { IndexModule } from './index.module';

describe('LoginModule', () => {
    let indexModule: IndexModule;

    beforeEach(() => {
        indexModule = new IndexModule();
    });

    it('should create an instance', () => {
        expect(IndexModule).toBeTruthy();
    });
});
