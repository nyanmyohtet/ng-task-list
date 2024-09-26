import { Component, OnInit } from "@angular/core";
import { TaskService } from "./task.service";
import { TaskItem } from "./task-item/task-item.model";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  canCompleteTask(task: TaskItem): boolean {
    return this.taskService.canCompleteTask(task);
  }

  getTaskCounts() {
    return this.taskService.getTaskCounts();
  }

  isDependencyCompleted(dep: string): boolean {
    const depTask = this.tasks.find((t) => t.name === dep);
    return depTask ? depTask.completed : false;
  }
}
