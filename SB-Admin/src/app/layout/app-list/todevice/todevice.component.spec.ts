import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToDeviceComponent } from './todevice.component';
import { ToDeviceModule } from './todevice.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';
import { MyappRoutingModule } from '../myapp/myapp-routing.module';
import { MyappModule } from '../myapp/myapp.module';
import { DeviceListRoutingModule } from '../../device/device-list/device-list-routing.module';
import { DeviceListModule } from '../../device/device-list/device-list.module';

describe('ToDeviceComponent', () => {
  let component: ToDeviceComponent;
  let fixture: ComponentFixture<ToDeviceComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeviceListRoutingModule,
          DeviceListModule,
          ToDeviceModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          HomeRoutingModule,
          HomeModule,
          MyappRoutingModule,
          MyappModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
