import { SettingsListModule } from './settings-list.module';

describe('SettingsListModule', () => {
    let settingsListModule: SettingsListModule;

    beforeEach(() => {
        settingsListModule = new SettingsListModule();
    });

    it('should create an instance', () => {
        expect(SettingsListModule).toBeTruthy();
    });
});
