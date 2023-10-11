import { Component, OnInit } from "@angular/core";
import { HTTPService } from "src/app/services/http.service";
import { Product, Service } from "../interfaces/interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent implements OnInit {
  public services: Service[] = [];
  public milkProducts: Product[] = [];
  public souvenirProducts: Product[] = [];
  public loadingRequests!: number;
  public shopAddresses!: Observable<{ address: string }[]>;
  public carouselImgs: string[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (item) => item + ".jpg"
  );
  public responsiveOptions = [
    {
      breakpoint: "2000px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1220px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "800px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private readonly http: HTTPService) {}

  ngOnInit(): void {
    this.loadingRequests = 2;
    this.http.getServices().subscribe((res: Service[]) => {
      if (!res) return;
      this.services = res;
      this.loadingRequests--;
    });

    this.http.getProducts().subscribe((res: Product[]) => {
      if (!res) return;

      res.map((item) => {
        switch (item.type) {
          case "молочная продукция":
            this.milkProducts.push(item);
            break;
          case "сувениры":
            this.souvenirProducts.push(item);
            break;
          default:
            break;
        }
      });

      this.loadingRequests--;
    });

    this.shopAddresses = this.http.getShopAddresses();
  }
}
