import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from './layout.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { HomeModule } from './home/home.module';
describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          LayoutModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
          HttpClientTestingModule,
          HomeModule,
          HomeRoutingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
