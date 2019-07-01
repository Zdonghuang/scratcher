import { DeviceModule } from './device.module';

describe('DeviceModule', () => {
    let deviceModule: DeviceModule;

    beforeEach(() => {
        deviceModule = new DeviceModule();
    });

    it('should create an instance', () => {
        expect(DeviceModule).toBeTruthy();
    });
});
