import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceSearchComponent } from './device-search.component';
import { DeviceSearchModule } from './device-search.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('DeviceSearchComponent', () => {
  let component: DeviceSearchComponent;
  let fixture: ComponentFixture<DeviceSearchComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeviceSearchModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          HomeRoutingModule,
          HomeModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
