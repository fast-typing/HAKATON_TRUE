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
  public isRentVisible: boolean = false;
  public lines: number = 2;
  public isAdmin: boolean = false;
  public formData!: FormGroup;
  public dates!: string;
  public phone!: string;
  public disable: Date[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HTTPService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges() {
    this.disable =
      this.data.rented_days?.["123"]?.map(
        (item: any) => new Date(Date.parse(item))
      ) ?? [];
  }

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

  getDate(date: string[]): Date[] {
    const dates = date.map((item) => new Date(item));
    console.log(dates);
    return dates;
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleRent() {
    console.log(this.dates);
    this.isRentVisible = !this.isRentVisible;
  }

  toggleLines() {
    this.lines = this.lines == 2 ? 999 : 2;
  }

  order() {}

  updateCard() {
    const body = {
      ...this.formData.value,
      type: this.data.type,
      phone_number: this.phone,
      rented_days: { 123: this.dates },
    };
    this.http.updateService(this.data.id, body).subscribe((res) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Успех",
        detail: "Вы успешно изменили карточку!",
      });
      location.reload();
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
          location.reload();
        });
      },
    });
  }
}
