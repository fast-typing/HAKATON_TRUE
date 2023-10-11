import { HtmlParser } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Product, Service } from "src/app/interfaces/interface";
import { CookiesService } from "src/app/services/cookies.service";
import { HTTPService } from "src/app/services/http.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  providers: [ConfirmationService],
})
export class CardComponent {
  @Input() data!: Service;
  @Input() isRent: boolean = false;
  public isModalVisible: boolean = false;
  public lines: number = 2;
  public isAdmin: boolean = false;
  public formData!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HTTPService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") == "true";
    this.formData = this.fb.group({
      name: this.data.name,
      price: this.data.price,
      time: this.data.time,
      description: this.data.description,
      img: this.data.img,
    });
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleLines() {
    this.lines = this.lines == 2 ? 999 : 2;
  }

  order() {
    
  }

  updateCard() {
    this.http
      .updateService(this.data.id, {
        ...this.formData.value,
        type: this.data.type,
      })
      .subscribe((res) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Успех",
          detail: "Вы успешно изменили карточку!",
        });
        this.toggleModal();
        location.reload()
      });
  }

  deleteCard(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Вы уверенны что хотите удалить карточку?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.http.deleteService(this.data.id).subscribe((res) => {
          this.messageService.add({
            key: "toast",
            severity: "success",
            summary: "Успех",
            detail: "Вы успешно удалили карточку!",
          });
          location.reload()
        });
      },
    });
  }
}
