export interface TaskItem {
  type: string;
  name: string;
  deps: string[];
  completed: boolean;
}
