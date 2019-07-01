import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceEditComponent } from './device-edit.component';
import { DeviceEditModule } from './device-edit.module';
import { DeviceRoutingModule } from '../device-routing.module';
import { DeviceModule } from '../device.module';
import { DeviceListRoutingModule } from '../device-list/device-list-routing.module';
import { DeviceListModule } from '../device-list/device-list.module';

describe('DeviceEditComponent', () => {
  let component: DeviceEditComponent;
  let fixture: ComponentFixture<DeviceEditComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeviceListRoutingModule,
          DeviceListModule,
          DeviceEditModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          DeviceRoutingModule,
          DeviceModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
