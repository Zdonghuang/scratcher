import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CheckemailComponent } from './checkemail.component';
import { CheckemailModule } from './checkemail.module';
import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginModule } from '../login/login.module';
import { HomeRoutingModule } from '../layout/home/home-routing.module';
import { HomeModule } from '../layout/home/home.module';
import { MyappRoutingModule } from '../layout/app-list/myapp/myapp-routing.module';
import { MyappModule } from '../layout/app-list/myapp/myapp.module';

describe('CheckemailComponent', () => {
  let component: CheckemailComponent;
  let fixture: ComponentFixture<CheckemailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MyappRoutingModule,
          MyappModule,
          HomeRoutingModule,
          HomeModule,
          LoginRoutingModule,
          LoginModule,
          CheckemailModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
