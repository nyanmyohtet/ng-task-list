import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service"; // Assume you have an AuthService to handle authentication

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent {
  public username: string = "";
  public password: string = "";
  public errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.authService.signIn(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(["/task-list"]);
      },
      error: (err) => {
        this.errorMessage = "Invalid credentials. Please try again.";
      },
    });
  }
}
