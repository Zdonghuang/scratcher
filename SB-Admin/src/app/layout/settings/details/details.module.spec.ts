import { DetailsModule } from './details.module';

describe('DetailsModule', () => {
    let detailsModule: DetailsModule;

    beforeEach(() => {
        detailsModule = new DetailsModule();
    });

    it('should create an instance', () => {
        expect(DetailsModule).toBeTruthy();
    });
});
