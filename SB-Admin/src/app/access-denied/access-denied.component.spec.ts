import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeRoutingModule } from '../layout/home/home-routing.module';
import { HomeModule } from '../layout/home/home.module';
import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent;
  let fixture: ComponentFixture<AccessDeniedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeRoutingModule,
        HomeModule
      ],
      declarations: [ AccessDeniedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
