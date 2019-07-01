import { DeviceEditModule } from './device-edit.module';

describe('DeviceEditModule', () => {
    let deviceeditModule: DeviceEditModule;

    beforeEach(() => {
        deviceeditModule = new DeviceEditModule();
    });

    it('should create an instance', () => {
        expect(DeviceEditModule).toBeTruthy();
    });
});
