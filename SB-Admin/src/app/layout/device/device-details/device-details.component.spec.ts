import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceDetailsComponent } from './device-details.component';
import { DeviceDetailsModule } from './device-details.module';
import { DeviceListRoutingModule } from '../device-list/device-list-routing.module';
import { DeviceListModule } from '../device-list/device-list.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('DeviceDetailsComponent', () => {
  let component: DeviceDetailsComponent;
  let fixture: ComponentFixture<DeviceDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeviceListModule,
          DeviceListRoutingModule,
          HomeRoutingModule,
          HomeModule,
          DeviceDetailsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
