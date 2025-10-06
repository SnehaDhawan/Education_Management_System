import { TestBed } from '@angular/core/testing';

import { TaskAssign } from './task-assign';

describe('TaskAssign', () => {
  let service: TaskAssign;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAssign);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
