import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { TaskItem } from "./task-item";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  @Input() taskItem: TaskItem;
  @Output() editTransactionItem: EventEmitter<TaskItem> = new EventEmitter();

  public editSelectedTransaction: TaskItem;
  public openAddEditModal: Subject<TaskItem> = new Subject();

  constructor(private _modalService: NgbModal) {}

  public ngOnInit(): void {}

  public openEditTransactionModal(taskItem: TaskItem): void {
    this.editSelectedTransaction = JSON.parse(JSON.stringify(taskItem)); // sending the deep copy to edit modal to not see dynamic updates on UI
    this.openAddEditModal.next(this.editSelectedTransaction); // open edit modal and fill the values
  }
}
