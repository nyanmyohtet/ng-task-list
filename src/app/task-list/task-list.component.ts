import { Component, OnInit } from "@angular/core";
import { TaskService } from "./task.service";

interface Task {
  type: string;
  name: string;
  deps: string[];
  completed: boolean;
}

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  canCompleteTask(task: Task): boolean {
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
