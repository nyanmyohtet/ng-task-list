import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { TaskFilterType } from "./task-filter-type";
import { TaskItem } from "./task-item/task-item";
import { TaskService } from "./task.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  public transactions$: TaskItem[]; // async list of Transaction items
  public selectedFilterType: string; // the current filter type (like 'by label) which used to filter transaction by
  public filterValue: string = "";

  public readonly filterTypes: TaskFilterType[] = [
    { displayName: "Customer ID", apiKey: "customerId" },
    { displayName: "Account Number", apiKey: "accountNumber" },
    { displayName: "Description", apiKey: "description" },
  ];

  public openAddEditModal: Subject<TaskItem> = new Subject(); // the caller for add/edit modal
  public onAddEditComplete: Subject<void> = new Subject(); // the ajax complete result callback

  public get transactions(): Readonly<TaskItem[]> {
    return this._transactionList;
  }

  private _transactionList: TaskItem[] = [];
  private _totalItems: number = 0;
  public _itemsPerPage: number = 10;
  public _currentPage: number = 1;

  public pageSizes: number[] = [10, 20, 50, 100];

  private _filterBSDestroyed$: Subject<string> = new Subject();
  private _getTransactionListDestroyed$: Subject<TaskItem[]> = new Subject();
  private _deleteTransactionItemDestroyed$: Subject<any> = new Subject();
  private _addTransactionItemDestroyed$: Subject<TaskItem> = new Subject();
  private _editTransactionItemDestroyed$: Subject<TaskItem> = new Subject();

  public selectedFilterDisplayName: string;

  constructor(
    private transactionService: TaskService,
    private authService: AuthService
  ) {}

  signOut(): void {
    this.authService.signOut();
  }

  public ngOnInit(): void {
    this.selectedFilterType = this.filterTypes[0].apiKey;
    this.selectedFilterDisplayName = this.filterTypes[0].displayName;
    this.getTransactionList({
      customerId: "",
      accountNumber: "",
      description: "",
    });
  }

  public ngOnDestroy(): void {
    this._filterBSDestroyed$.complete();
    this._getTransactionListDestroyed$.complete();
    this._addTransactionItemDestroyed$.complete();
    this._editTransactionItemDestroyed$.complete();
    this._deleteTransactionItemDestroyed$.complete();
  }

  public getTransactionList(paramsObj?: any): void {
    this.transactionService
      .getTransactionList(paramsObj, this._currentPage, this._itemsPerPage)
      .pipe(takeUntil(this._getTransactionListDestroyed$))
      .subscribe((response) => {
        this._transactionList = response.items;
        this._totalItems = response.totalItems;
      });
  }

  public chooseFilterType(displayName: string): void {
    const selectedFilter = this.filterTypes.find(
      (ft) => ft.displayName === displayName
    );
    if (selectedFilter) {
      this.selectedFilterType = selectedFilter.apiKey;
      this.selectedFilterDisplayName = selectedFilter.displayName;
      this.performSearch();
    }
  }

  public performSearch(): void {
    const paramsObj: any = {
      customerId: "",
      accountNumber: "",
      description: "",
    };

    if (this.selectedFilterType && this.filterValue) {
      paramsObj[this.selectedFilterType] = this.filterValue;
    }

    this.getTransactionList(paramsObj);
  }

  public resetFilter(): void {
    this.filterValue = "";
    this.performSearch();
  }

  public editTransactionItem(taskItem: TaskItem): void {
    this.transactionService
      .editTransactionItem(taskItem)
      .pipe(takeUntil(this._editTransactionItemDestroyed$))
      .subscribe(() => {
        this.performSearch();
      });
  }

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this._currentPage = page;
    this.performSearch();
  }

  public onItemsPerPageChange(value: string): void {
    this._itemsPerPage = +value;
    this._currentPage = 1;
    this.performSearch();
  }

  public get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  public get totalPages(): number {
    return Math.ceil(this._totalItems / this._itemsPerPage);
  }
}
