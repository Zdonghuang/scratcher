import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Step2Component } from './step2.component';
import { Step2Module } from './step2.module';
import { HomeRoutingModule } from '../../home/home-routing.module';
import { HomeModule } from '../../home/home.module';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HomeRoutingModule,
          HomeModule,
          Step2Module,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
