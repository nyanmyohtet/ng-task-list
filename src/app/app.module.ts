import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TaskItemComponent } from "./transaction-list/task-item/task-item.component";
import { TransactionListComponent } from "./transaction-list/transaction-list.component";
import { MessageService } from "./shared/message.service";
import { HttpErrorHandler } from "./shared/http-error-handler.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddEditTransactionComponent } from "./shared/add-edit-modal/add-edit-transaction/add-edit-transaction.component";
import { SignInComponent } from "./sign-in/sign-in.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskItemComponent,
    TransactionListComponent,
    AddEditTransactionComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [HttpClient, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
