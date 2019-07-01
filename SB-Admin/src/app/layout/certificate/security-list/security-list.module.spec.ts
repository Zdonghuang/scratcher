import { SecurityListModule } from './security-list.module';

describe('SecurityListModule', () => {
    let securityListModule: SecurityListModule;

    beforeEach(() => {
        securityListModule = new SecurityListModule();
    });

    it('should create an instance', () => {
        expect(SecurityListModule).toBeTruthy();
    });
});
