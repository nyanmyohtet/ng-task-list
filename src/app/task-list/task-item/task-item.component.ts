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

}
