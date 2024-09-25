import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, Subscription } from "rxjs";
import { TransactionItem } from "src/app/transaction-list/transaction-item/transaction-item";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-edit-transaction",
  templateUrl: "./add-edit-transaction.component.html",
  styleUrls: ["./add-edit-transaction.component.scss"],
})
export class AddEditTransactionComponent implements OnInit {
  @Input() openModal: Subject<TransactionItem> = new Subject();
  @Output() onCompleteAction: EventEmitter<TransactionItem> =
    new EventEmitter();

  @ViewChild("editTransaction") public editTransaction: TemplateRef<any>;

  public addEditForm: UntypedFormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private _modalService: NgbModal, fb: UntypedFormBuilder) {
    this.addEditForm = fb.group({
      id: [],
      description: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.openModal // on modal open call
        .subscribe((v) => {
          // bind data to addEditForm
          this.addEditForm.patchValue({ id: v.id, description: v.description });
          // opening the Add/Edit modal
          this._modalService
            .open(this.editTransaction, { ariaLabelledBy: "modal-basic-title" })
            .result.then((result) => {
              // on Submit action
              console.log(this.addEditForm.value);
              this.onCompleteAction.next(this.addEditForm.value);
            });
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // removing the add/edit modal on component unload
  }
}
