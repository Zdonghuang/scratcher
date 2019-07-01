import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from '../home/home-routing.module';
import { HomeModule } from '../home/home.module';
import { AppListComponent } from './app-list.component';
import { AppListModule } from './app-list.module';

describe('AppListComponent', () => {
  let component: AppListComponent;
  let fixture: ComponentFixture<AppListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HomeModule,
          HomeRoutingModule,
          AppListModule,
          BrowserAnimationsModule,
          RouterTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
