import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CookiesService } from "src/app/services/cookies.service";
import { HTTPService } from "src/app/services/http.service";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isAuth = false;
  public isAuthModalVisible = false; //
  public isMobileModalVisible = false; //
  public chosenModal!: string; //
  public userData!: FormGroup;
  public isAdmin!: boolean;

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly fb: FormBuilder,
    private readonly route: Router,
    private readonly http: HTTPService,
    private readonly messageService: MessageService,
    private readonly viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.isAuth = !!this.cookiesService.getCookie("access_token");
    this.userData = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
    this.isAdmin = localStorage.getItem("isAdmin") == "true";
  }

  openModal(type: string) {
    this.chosenModal = type;
    this.userData.patchValue({
      username: "",
      password: "",
    });
    this.userData.markAsUntouched();
    this.isAuthModalVisible = true;
  }

  submit() {
    if (this.chosenModal == "Регистрация") {
      this.registration();
    } else if (this.chosenModal == "Вход") {
      this.login();
    }
  }

  registration(): void {
    if (this.userData.invalid) return;

    const value = this.userData.value;
    this.http.registration(value).subscribe({
      next: (res) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Успех",
          detail: "Вы зарегистрировались!",
        });
        this.isAuthModalVisible = false;
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Ошибка",
          detail: "Что-то пошло не так... :(",
        });
      },
    });
  }

  login() {
    if (
      !this.userData.get("userName")?.valid &&
      !this.userData.get("password")?.valid
    )
      return;

    const value = this.userData.value;
    delete value.email;
    this.http.login(value).subscribe({
      next: (res: any[]) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Успех",
          detail: "Вы авторизовались!",
        });
        this.isAuthModalVisible = false;
        localStorage.setItem("isAdmin", res[1]);
        if (res[1]) {
          this.messageService.add({
            key: "toast",
            severity: "info",
            summary: "Вход в админ панель",
            detail: "Вы успешно вошли под правами администратора",
          });
        }
        const tokens = res[0];
        const access_token = tokens["access_token"];
        const refresh_token = tokens["refresh_token"];

        if (access_token && refresh_token) {
          localStorage.setItem('username', this.userData.value.username)
          this.isAuth = true;
          this.cookiesService.setCookie("access_token", access_token);
          this.cookiesService.setCookie("refresh_token", refresh_token);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }

        this.userData.patchValue({
          username: "",
          password: "",
          email: "",
        });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Ошибка",
          detail: "Неккоректное имя или пароль!",
        });
      },
    });
  }

  logout() {
    this.cookiesService.deleteCookie("access_token");
    this.cookiesService.deleteCookie("refresh_token");
    location.reload();
    this.isAuth = false;
    localStorage.setItem("isAdmin", "false");
    localStorage.removeItem('username')
  }

  routeTo(path: string) {
    this.route.navigate([path]);
    this.isMobileModalVisible = false;
  }
}
