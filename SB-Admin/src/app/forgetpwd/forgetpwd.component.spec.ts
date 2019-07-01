import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ForgetpwdComponent } from './forgetpwd.component';
import { ForgetpwdModule } from './forgetpwd.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignupComponent', () => {
  let component: ForgetpwdComponent;
  let fixture: ComponentFixture<ForgetpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), ForgetpwdModule, RouterTestingModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
