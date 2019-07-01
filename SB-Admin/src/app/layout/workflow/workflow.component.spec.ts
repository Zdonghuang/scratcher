import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkflowComponent } from './workflow.component';
import { WorkflowModule } from './workflow.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { HomeModule } from '../home/home.module';

describe('WorkflowComponent', () => {
  let component: WorkflowComponent;
  let fixture: ComponentFixture<WorkflowComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HomeRoutingModule,
          HomeModule,
          WorkflowModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          HttpClientTestingModule
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
