import { Component } from "@angular/core";

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
export class TaskListComponent {
  tasks: Task[] = [
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

  canCompleteTask(task: Task): boolean {
    if (task.deps.length === 0) return true;

    return task.deps.every((dep) => {
      const depTask = this.tasks.find((t) => t.name === dep);
      return depTask ? depTask.completed : false;
    });
  }

  isDependencyCompleted(dep: string): boolean {
    const depTask = this.tasks.find((t) => t.name === dep);
    return depTask ? depTask.completed : false;
  }
}
