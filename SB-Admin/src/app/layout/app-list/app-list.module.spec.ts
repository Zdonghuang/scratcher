import { AppListModule } from './app-list.module';

describe('AppListModule', () => {
    let applistModule: AppListModule;

    beforeEach(() => {
        applistModule = new AppListModule();
    });

    it('should create an instance', () => {
        expect(AppListModule).toBeTruthy();
    });
});
