import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddDeviceComponent } from './add-device.component';
import { AddDeviceModule } from './add-device.module';
import { MyappRoutingModule } from '../../app-list/myapp/myapp-routing.module';
import { MyappModule } from '../../app-list/myapp/myapp.module';
import { DeviceListRoutingModule } from '../device-list/device-list-routing.module';
import { DeviceListModule } from '../device-list/device-list.module';

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeviceListRoutingModule,
          DeviceListModule,
          AddDeviceModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          MyappRoutingModule,
          MyappModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
