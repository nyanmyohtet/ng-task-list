import { Injectable } from "@angular/core";
import { TaskItem } from "./task-item/task-item.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks: TaskItem[] = [
    { type: "BUG", name: "fix bug1", deps: [], completed: false },
    { type: "BUG", name: "fix bug2", deps: [], completed: false },
    { type: "IMPR", name: "refactor W", deps: [], completed: false },
    {
      type: "IMPL",
      name: "implement feature X",
      deps: ["fix bug2", "refactor W"],
      completed: false,
    },
    {
      type: "INFRA",
      name: "release",
      deps: ["fix bug1", "fix bug2", "implement feature X"],
      completed: false,
    },
    { type: "INFRA", name: "deploy", deps: ["release"], completed: false },
  ];

  getTasks(): TaskItem[] {
    return this.tasks;
  }

  canCompleteTask(task: TaskItem): boolean {
    if (task.deps.length === 0) return true; // No dependencies, can be completed
    return task.deps.every((dep) => {
      const depTask = this.tasks.find((t) => t.name === dep);
      return depTask ? depTask.completed : false;
    });
  }

  getTaskCounts() {
    const counts = {
      BUG: 0,
      IMPR: 0,
      IMPL: 0,
      INFRA: 0,
    };

    this.tasks.forEach((task) => {
      if (!task.completed) {
        counts[task.type]++;
      }
    });

    return counts;
  }
}
