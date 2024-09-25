import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/v1/auth/login"; // Adjust the URL to your API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(
        map((response) => {
          localStorage.setItem("authToken", response.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  public signOut(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(["/sign-in"]);
  }
}
