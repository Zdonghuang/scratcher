import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MobileDetailComponent } from './mobile-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('MobileDetailComponent', () => {
  let component: MobileDetailComponent;
  let fixture: ComponentFixture<MobileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HomeRoutingModule,
        HomeModule,
        RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ MobileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
