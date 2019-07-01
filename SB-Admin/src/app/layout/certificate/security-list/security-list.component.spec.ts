import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SecurityListComponent } from './security-list.component';
import { SecurityListModule } from './security-list.module';
import { LoginRoutingModule } from '../../../login/login-routing.module';
import { LoginModule } from '../../../login/login.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('SecurityListComponent', () => {
  let component: SecurityListComponent;
  let fixture: ComponentFixture<SecurityListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          LoginRoutingModule,
          LoginModule,
          SecurityListModule,
          HomeRoutingModule,
          HomeModule
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
