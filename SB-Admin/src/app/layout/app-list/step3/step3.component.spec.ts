import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Step3Component } from './step3.component';
import { Step3Module } from './step3.module';
import { SecurityListModule } from '../../certificate/security-list/security-list.module';
import { MyappModule } from '../myapp/myapp.module';
import { MyappRoutingModule } from '../myapp/myapp-routing.module';
import { DeviceListRoutingModule } from '../../device/device-list/device-list-routing.module';
import { DeviceListModule } from '../../device/device-list/device-list.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MyappModule,
          MyappRoutingModule,
          HomeRoutingModule,
          HomeModule,
          DeviceListRoutingModule,
          DeviceListModule,
          Step3Module,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          SecurityListModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
