import { AddDeviceModule } from './add-device.module';

describe('AddDeviceModule', () => {
    let addDeviceModule: AddDeviceModule;

    beforeEach(() => {
        addDeviceModule = new AddDeviceModule();
    });

    it('should create an instance', () => {
        expect(AddDeviceModule).toBeTruthy();
    });
});
