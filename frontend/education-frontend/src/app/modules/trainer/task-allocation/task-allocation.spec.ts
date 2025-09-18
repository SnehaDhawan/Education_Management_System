import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAllocation } from './task-allocation';

describe('TaskAllocation', () => {
  let component: TaskAllocation;
  let fixture: ComponentFixture<TaskAllocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAllocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAllocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
