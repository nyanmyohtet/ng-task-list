import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { SignInComponent } from "./sign-in/sign-in.component";
import { TaskListComponent } from "./task-list/task-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/task-list", pathMatch: "full" },
  // { path: "", redirectTo: "/sign-in", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  {
    path: "task-list",
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
