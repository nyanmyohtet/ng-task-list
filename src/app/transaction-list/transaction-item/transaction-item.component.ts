import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { TransactionItem } from "./transaction-item";

@Component({
  selector: "app-transaction-item",
  templateUrl: "./transaction-item.component.html",
  styleUrls: ["./transaction-item.component.scss"],
})
export class TransactionItemComponent implements OnInit {
  @Input() transactionItem: TransactionItem;
  @Output() editTransactionItem: EventEmitter<TransactionItem> =
    new EventEmitter();

  public editSelectedTransaction: TransactionItem;
  public openAddEditModal: Subject<TransactionItem> = new Subject();

  constructor(private _modalService: NgbModal) {}

  public ngOnInit(): void {}

  public openEditTransactionModal(transactionItem: TransactionItem): void {
    this.editSelectedTransaction = JSON.parse(JSON.stringify(transactionItem)); // sending the deep copy to edit modal to not see dynamic updates on UI
    this.openAddEditModal.next(this.editSelectedTransaction); // open edit modal and fill the values
  }
}
