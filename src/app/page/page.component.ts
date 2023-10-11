import { Component, OnInit } from "@angular/core";
import { HTTPService } from "src/app/services/http.service";
import { Problem, Product, Service } from "../interfaces/interface";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent implements OnInit {
  public services: Service[] = [];
  public products: Product[] = [];
  public problems: Problem[] = [];
  public loadingRequests!: number;
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

  public isDonationModalOpen: boolean = false
  public donationData!: FormGroup

  constructor(private readonly http: HTTPService, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadingRequests = 3;
    this.http.getServices().subscribe((res: Service[]) => {
      if (!res) return;
      this.services = res;
      this.loadingRequests--;
    });

    this.http.getProducts().subscribe((res: Product[]) => {
      if (!res) return;
      this.products = res
      this.loadingRequests--;
    });

    this.http.getProblems().subscribe((res: Problem[]) => {
      if (!res) return;
      this.problems = res
      this.donationData = this.fb.group({
        title: this.problems[0],
        amount: ['', [Validators.required]],
        phone: ['', [Validators.required]]
      })
      this.loadingRequests--;
    });

  }

  toggleDonationModal() {
    this.isDonationModalOpen = !this.isDonationModalOpen
  }

  getPercent(num: number) {
    return Math.floor(num * 100)
  }
}
