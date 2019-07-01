import { DeviceSearchModule } from './device-search.module';

describe('DeviceSearchModule', () => {
  let devicesearchModule: DeviceSearchModule;

  beforeEach(() => {
    devicesearchModule = new DeviceSearchModule();
  });

  it('should create an instance', () => {
    expect(DeviceSearchModule).toBeTruthy();
  });
});
