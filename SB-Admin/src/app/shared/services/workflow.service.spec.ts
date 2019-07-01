import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkflowService } from './workflow.service';

describe('WorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: WorkflowService = TestBed.get(WorkflowService);
    expect(service).toBeTruthy();
  });
});
