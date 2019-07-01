import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsComponent } from './settings.component';
import { SettingsModule } from './settings.module';
import { HomeRoutingModule } from '../../layout/home/home-routing.module';
import { HomeModule } from '../../layout/home/home.module';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HomeRoutingModule,
          HomeModule,
          SettingsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
