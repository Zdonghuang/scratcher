import { DeviceListModule } from './device-list.module';

describe('DeviceListModule', () => {
    let devicelistModule: DeviceListModule;

    beforeEach(() => {
        devicelistModule = new DeviceListModule();
    });

    it('should create an instance', () => {
        expect(DeviceListModule).toBeTruthy();
    });
});
