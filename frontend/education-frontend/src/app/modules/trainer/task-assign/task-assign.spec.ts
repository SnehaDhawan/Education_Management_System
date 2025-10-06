import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssign } from './task-assign';

describe('TaskAssign', () => {
  let component: TaskAssign;
  let fixture: ComponentFixture<TaskAssign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAssign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAssign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
