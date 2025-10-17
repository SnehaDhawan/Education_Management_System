import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAsianComponent } from './task-asian.component';

describe('TaskAsianComponent', () => {
  let component: TaskAsianComponent;
  let fixture: ComponentFixture<TaskAsianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAsianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAsianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
