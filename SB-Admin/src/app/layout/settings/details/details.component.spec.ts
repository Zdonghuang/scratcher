import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailsComponent } from './details.component';
import { DetailsModule } from './details.module';
import { SettingsListRoutingModule } from '../settings-list/settings-list-routing.module';
import { SettingsListModule } from '../settings-list/settings-list.module';
import { SecurityListModule } from '../../certificate/security-list/security-list.module';
import { SecurityListRoutingModule } from '../../certificate//security-list/security-list-routing.module';

describe('DetailsComponent2', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DetailsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          SettingsListRoutingModule,
          SettingsListModule,
          SecurityListModule,
          SecurityListRoutingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
