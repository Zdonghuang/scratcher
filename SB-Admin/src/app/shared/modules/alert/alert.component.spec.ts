import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert.component';
import { HomeRoutingModule } from '../../../layout/home/home-routing.module';
import { HomeModule } from '../../../layout/home/home.module';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeRoutingModule,
        HomeModule
      ],
      providers: [AlertService],
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
