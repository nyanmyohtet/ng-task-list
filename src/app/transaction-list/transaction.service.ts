import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  HandleError,
  HttpErrorHandler,
} from "../shared/http-error-handler.service";
import { TransactionItem } from "./transaction-item/transaction-item";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private handleError: HandleError; // for general error handling (can be improved)
  private transactionBaseUrl = `${environment.apiUrl}/api/v1/transactions`;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TransactionService");
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

  public editTransactionItem(
    transactionItem: TransactionItem
  ): Observable<TransactionItem> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : "",
    });
    return this.http
      .patch<TransactionItem>(
        `${this.transactionBaseUrl}/${transactionItem.id}`,
        {
          description: transactionItem.description,
        },
        { headers }
      )
      .pipe(
        catchError(this.handleError("editTransactionItem", [])),
        map(this._transform)
      );
  }

  private _transform(dbTransactionItem: any): TransactionItem {
    return new TransactionItem(
      dbTransactionItem.id,
      dbTransactionItem.customerId,
      dbTransactionItem.accountNumber,
      dbTransactionItem.description
    );
  }
}
