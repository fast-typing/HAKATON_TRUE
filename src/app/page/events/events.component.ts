import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTPService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { Product, Service } from 'src/app/interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnChanges, OnInit {
  @Input() data!: Service[]
  public meetingService: Service[] = []
  public muvirService: Service[] = []
  public rentHomeService: Service[] = []
  public rentOtherService: Service[] = []
  
  public isAdmin: boolean = false
  public isModalVisible: boolean = false
  public formData!: FormGroup
  public choosenType!: "аренда" | "мероприятие" | "прокат" | "услуга"
  
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
  }

  ngOnChanges(): void {
    this.data.map((item) => {
      switch (item.type) {
        case 'мероприятие': this.meetingService.push(item); break
        case 'аренда': this.rentHomeService.push(item); break
        case 'прокат': this.rentOtherService.push(item); break
        case 'мувыр': this.muvirService.push(item); break
        default: break;
      }
    })
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }

  changeType(type: "аренда" | "мероприятие" | "прокат" | "услуга") { 
    this.choosenType = type
    this.toggleModal()
  }

  createService() {
    this.http.createService({...this.formData.value, type: this.choosenType}).subscribe((res) => {
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
