import { ToDeviceModule } from './todevice.module';

describe('ToDeviceModule', () => {
    let toDeviceModule: ToDeviceModule;

    beforeEach(() => {
        toDeviceModule = new ToDeviceModule();
    });

    it('should create an instance', () => {
        expect(ToDeviceModule).toBeTruthy();
    });
});
