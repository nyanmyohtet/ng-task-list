import { Component, Input } from "@angular/core";
import { TaskItem } from "./task-item.model";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent {
  @Input() task!: TaskItem;
  @Input() canComplete!: boolean;
  @Input() isDependencyCompleted!: (dep: string) => boolean;

  toggleCompletion() {
    this.task.completed = !this.task.completed;
  }
}
