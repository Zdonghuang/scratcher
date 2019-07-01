import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailsComponent } from './details.component';
import { DetailsModule } from './details.module';
import { CertificateRoutingModule } from '../certificate-routing.module';
import { CertificateModule } from '../certificate.module';
import { SecurityListModule } from '../security-list/security-list.module';
import { SecurityListRoutingModule } from '../security-list/security-list-routing.module';

describe('DetailsComponent1', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          SecurityListModule,
          SecurityListRoutingModule,
          DetailsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          CertificateRoutingModule,
          CertificateModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
