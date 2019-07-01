import { CertificateModule } from './certificate.module';

describe('CertificateModule', () => {
    let certificateModule: CertificateModule;

    beforeEach(() => {
        certificateModule = new CertificateModule();
    });

    it('should create an instance', () => {
        expect(CertificateModule).toBeTruthy();
    });
});
