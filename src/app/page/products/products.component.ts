import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTPService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { Product, Service } from 'src/app/interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges, OnInit {
  @Input() data!: Product[]
  public milkProducts: Product[] = [];
  public souvenirProducts: Product[] = [];
  public shopAddresses!: Observable<{ address: string }[]>;

  public isAdmin: boolean = false
  public isModalVisible: boolean = false
  public formData!: FormGroup
  public choosenType!: "сувениры" | "молочная продукция"

  constructor(private fb: FormBuilder, private http: HTTPService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
    })
    this.isAdmin = localStorage.getItem('isAdmin') == "true"
    this.shopAddresses = this.http.getShopAddresses();
  }

  ngOnChanges(): void {
    this.data.map((item) => {
      switch (item.type) {
        case "молочная продукция": this.milkProducts.push(item); break;
        case "сувениры": this.souvenirProducts.push(item); break;
        default:
          break;
      }
    });
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }

  changeType(type: "сувениры" | "молочная продукция") {
    this.choosenType = type
    this.toggleModal()
  }

  createProduct() {
    this.http.createProduct({ ...this.formData.value, type: this.choosenType }).subscribe((res) => {
      if (!res) return
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Успех",
        detail: "Вы успешно создали карточку!",
      });
      this.toggleModal();
      location.reload()
    })
  }
}
