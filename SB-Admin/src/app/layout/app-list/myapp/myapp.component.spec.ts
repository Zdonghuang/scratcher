import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyappComponent } from './myapp.component';
import { MyappModule } from './myapp.module';
import { MyappRoutingModule } from './myapp-routing.module';

describe('MyappComponent', () => {
  let component: MyappComponent;
  let fixture: ComponentFixture<MyappComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MyappModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          MyappRoutingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
