import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CertificateComponent } from './certificate.component';
import { CertificateModule } from './certificate.module';
import { DetailsRoutingModule } from './security-details/details-routing.module';
import { SecurityListRoutingModule } from './security-list/security-list-routing.module';
import { DetailsModule } from './security-details/details.module';
import { SecurityListModule } from './security-list/security-list.module';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          CertificateModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          DetailsRoutingModule,
          SecurityListRoutingModule,
          DetailsModule,
          SecurityListModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
