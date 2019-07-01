import { DeviceDetailsModule } from './device-details.module';

describe('DeviceDetailsModule', () => {
    let devicedetailsModule: DeviceDetailsModule;

    beforeEach(() => {
        devicedetailsModule = new DeviceDetailsModule();
    });

    it('should create an instance', () => {
        expect(DeviceDetailsModule).toBeTruthy();
    });
});
