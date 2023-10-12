import { Component, OnInit } from "@angular/core";
import { HTTPService } from "src/app/services/http.service";
import { Problem, Product, Service } from "../interfaces/interface";
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent implements OnInit {
  public services: Service[] = [];
  public products: Product[] = [];
  public problems: Problem[] = [];
  public mainInfo!: any
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
  public formMainInfo!: FormGroup
  public isDonationModalOpen: boolean = false
  public donationData!: FormGroup
  public isAdmin!: boolean

  constructor(private readonly http: HTTPService, private readonly fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') == "true"

    this.loadingRequests = 4;
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

    this.http.getMainInfo().subscribe((res) => {
      if (!res) return;
      this.mainInfo = res[0]
      this.formMainInfo = this.fb.group({
        title: this.mainInfo.title,
        subtitle: this.mainInfo.subtitle,
        main_image: this.mainInfo.main_image,
        history_block: this.mainInfo.history_block,
        supertitle: this.mainInfo.supertitle,
        carousel_image: this.fb.array(this.mainInfo.carousel_image)
      })
      console.log(this.mainInfo)
      this.formMainInfo.valueChanges.subscribe((item) => {
        console.log(item)
      })
      this.loadingRequests--
    })
  }

  get carousel_image() : FormArray {
    return this.formMainInfo.get("carousel_image") as FormArray
  }

  addToCarouselImage() {
    this.carousel_image.push(new FormControl())
  }

  removeCarouselImage(i: number) {
    this.carousel_image.removeAt(i)
  }

  changeMain() {
    this.http.updateMainInfo({...this.formMainInfo.value, carousel_image: this.carousel_image.value}).subscribe((res) => {
      if (!res) return
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Успех",
        detail: "Вы успешно обновили информацию!",
      });
      location.reload()
    })
  }

  toggleDonationModal() {
    this.isDonationModalOpen = !this.isDonationModalOpen
  }

  getPercent(num: number) {
    return Math.floor(num * 100)
  }
}
