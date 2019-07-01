import { CheckemailModule } from './checkemail.module';

describe('CheckemaiModule', () => {
    let checkemailModule: CheckemailModule;

    beforeEach(() => {
        checkemailModule = new CheckemailModule();
    });

    it('should create an instance', () => {
        expect(CheckemailModule).toBeTruthy();
    });
});
