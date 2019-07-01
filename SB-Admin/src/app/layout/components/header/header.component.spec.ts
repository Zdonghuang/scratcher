import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { LayoutModule } from '../../layout.module';
import { MyappRoutingModule } from '../../app-list/myapp/myapp-routing.module';
import { MyappModule } from '../../app-list/myapp/myapp.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MyappRoutingModule,
        MyappModule,
        LayoutModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        HomeRoutingModule,
        HomeModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
