import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsListComponent } from './settings-list.component';
import { SettingsListModule } from './settings-list.module';
import { HomeModule } from '../../home/home.module';

describe('SettingsListComponent', () => {
  let component: SettingsListComponent;
  let fixture: ComponentFixture<SettingsListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          SettingsListModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          HomeModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
