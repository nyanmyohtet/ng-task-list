import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  HandleError,
  HttpErrorHandler,
} from "../shared/http-error-handler.service";
import { TaskItem } from "./task-item/task-item";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private handleError: HandleError; // for general error handling (can be improved)
  private transactionBaseUrl = `${environment.apiUrl}/api/v1/transactions`;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TaskService");
  }

  public getTransactionList(
    paramsObj?: any,
    page: number = 0,
    itemsPerPage: number = 10
  ): Observable<any> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : "",
    });

    let params = new HttpParams()
      .set("pageNo", (--page).toString())
      .set("pageSize", itemsPerPage.toString());

    if (paramsObj) {
      for (const key in paramsObj) {
        if (paramsObj.hasOwnProperty(key)) {
          params = params.set(key, paramsObj[key]);
        }
      }
    }

    return this.http
      .get<any>(this.transactionBaseUrl, { headers, params })
      .pipe(
        map((response) => ({
          items: response.content.map(this._transform),
          totalItems: response.totalElements,
        })),
        catchError(
          this.handleError("getTransactionList", { items: [], totalItems: 0 })
        )
      );
  }

  public editTransactionItem(taskItem: TaskItem): Observable<TaskItem> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : "",
    });
    return this.http
      .patch<TaskItem>(
        `${this.transactionBaseUrl}/${taskItem.id}`,
        {
          description: taskItem.description,
        },
        { headers }
      )
      .pipe(
        catchError(this.handleError("editTransactionItem", [])),
        map(this._transform)
      );
  }

  private _transform(dbTransactionItem: any): TaskItem {
    return new TaskItem(
      dbTransactionItem.id,
      dbTransactionItem.customerId,
      dbTransactionItem.accountNumber,
      dbTransactionItem.description
    );
  }
}
